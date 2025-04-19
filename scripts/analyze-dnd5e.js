/**
 * Script to analyze the DnD5e system and generate a report of its classes, methods, properties, etc.
 * This version extracts JSDoc comments and infers types.
 */

const fs = require('fs');
const path = require('path');

// Path to the DnD5e system (can be overridden by command line argument)
const DND5E_PATH = process.argv[2] || path.resolve('tmp/dnd5e-source');

if (!fs.existsSync(DND5E_PATH)) {
  console.error(`DnD5e system not found at ${DND5E_PATH}`);
  process.exit(1);
}

console.log(`Analyzing DnD5e system at ${DND5E_PATH}...`);

// Function to recursively find all JS files
function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJsFiles(filePath, fileList);
    } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Find all JS files in the DnD5e system
const jsFiles = findJsFiles(DND5E_PATH);
console.log(`Found ${jsFiles.length} JS files in the DnD5e system`);

// Extract class definitions, interfaces, types, etc.
const classes = [];
const methods = {};
const methodDocs = {};
const methodTypes = {};
const properties = {};
const propertyDocs = {};
const propertyTypes = {};
const configs = {};
const hooks = [];
const constants = {};

// Helper function to extract JSDoc comments
function extractJSDoc(content, startIndex) {
  // Look for JSDoc comment before the given index
  const commentRegex = /\/\*\*([\s\S]*?)\*\/\s*$/;
  const beforeContent = content.substring(0, startIndex);
  const lastCommentMatch = beforeContent.match(commentRegex);
  
  if (lastCommentMatch) {
    // Clean up the JSDoc comment
    let jsDoc = lastCommentMatch[1];
    jsDoc = jsDoc.replace(/^\s*\*\s?/gm, ''); // Remove * at the beginning of lines
    return jsDoc.trim();
  }
  
  return '';
}

// Helper function to infer types from JSDoc comments and code
function inferType(jsDoc, code) {
  // Try to extract type from JSDoc @type or @param tags
  const typeTagMatch = jsDoc.match(/@type\s+{([^}]+)}/);
  if (typeTagMatch) return typeTagMatch[1];
  
  const returnTagMatch = jsDoc.match(/@returns?\s+{([^}]+)}/);
  if (returnTagMatch) return returnTagMatch[1];
  
  // For methods, look for return statements
  if (code && code.includes('return')) {
    if (code.includes('return true') || code.includes('return false')) {
      return 'boolean';
    }
    if (code.includes('return new Promise')) {
      return 'Promise<any>';
    }
    if (code.includes('return this')) {
      return 'this';
    }
  }
  
  // For properties, try to infer from assignments
  if (code) {
    if (code.includes('= true') || code.includes('= false')) {
      return 'boolean';
    }
    if (code.includes('= "') || code.includes("= '")) {
      return 'string';
    }
    if (code.match(/=\s*\d+(\.\d+)?/)) {
      return 'number';
    }
    if (code.includes('= []')) {
      return 'any[]';
    }
    if (code.includes('= {}')) {
      return 'Record<string, any>';
    }
  }
  
  // Default to any if we can't infer
  return 'any';
}

// Helper function to parse parameters from a method signature
function parseParameters(paramString, jsDoc) {
  if (!paramString || paramString.trim() === '') return [];
  
  return paramString.split(',').map(param => {
    param = param.trim();
    if (!param) return null;
    
    // Check for default values
    const hasDefault = param.includes('=');
    const paramName = hasDefault ? param.split('=')[0].trim() : param;
    
    // Try to find type in JSDoc
    const paramTypeMatch = jsDoc ? jsDoc.match(new RegExp(`@param\\s+{([^}]+)}\\s+${paramName}`)) : null;
    const paramType = paramTypeMatch ? paramTypeMatch[1] : 'any';
    
    return {
      name: paramName,
      type: paramType,
      optional: hasDefault
    };
  }).filter(p => p !== null);
}

// Process each file
jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relativeFile = path.relative(DND5E_PATH, file);
  
  // Extract class definitions
  const classRegex = /class\s+(\w+)(?:\s+extends\s+(\w+))?\s*\{/g;
  let classMatch;
  
  while ((classMatch = classRegex.exec(content)) !== null) {
    const className = classMatch[1];
    const extendsClass = classMatch[2] || null;
    const classStartIndex = classMatch.index;
    
    // Extract JSDoc for the class
    const classJSDoc = extractJSDoc(content, classStartIndex);
    
    classes.push({
      name: className,
      extends: extendsClass,
      file: relativeFile,
      jsDoc: classJSDoc
    });
    
    // Find the class body
    const classBodyRegex = new RegExp(`class\\s+${className}(?:\\s+extends\\s+\\w+)?\\s*\\{([\\s\\S]*?)\\n\\}(?=\\n|$)`, 'g');
    const classBodyMatch = classBodyRegex.exec(content);
    
    if (classBodyMatch && classBodyMatch[1]) {
      const classBody = classBodyMatch[1];
      
      // Initialize arrays for this class
      methods[className] = methods[className] || [];
      methodDocs[className] = methodDocs[className] || {};
      methodTypes[className] = methodTypes[className] || {};
      properties[className] = properties[className] || [];
      propertyDocs[className] = propertyDocs[className] || {};
      propertyTypes[className] = propertyTypes[className] || {};
      
      // Extract methods
      const methodRegex = /(?:static\s+)?(\w+)\s*\(([^)]*)\)\s*\{/g;
      let methodMatch;
      
      while ((methodMatch = methodRegex.exec(classBody)) !== null) {
        const isStatic = methodMatch[0].startsWith('static');
        const methodName = methodMatch[1];
        const methodParams = methodMatch[2] || '';
        const methodStartIndex = classBodyMatch.index + methodMatch.index;
        
        // Skip if it's a reserved word or already processed
        if (['if', 'for', 'while', 'switch', 'constructor'].includes(methodName)) {
          continue;
        }
        
        const fullMethodName = isStatic ? `static ${methodName}` : methodName;
        
        if (!methods[className].includes(fullMethodName)) {
          methods[className].push(fullMethodName);
          
          // Extract JSDoc comment
          const jsDoc = extractJSDoc(content, methodStartIndex);
          methodDocs[className][fullMethodName] = jsDoc;
          
          // Find method body to infer return type
          const methodBodyRegex = new RegExp(`${isStatic ? 'static\\s+' : ''}${methodName}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, 'g');
          const methodBodyMatch = methodBodyRegex.exec(classBody);
          const methodBody = methodBodyMatch ? methodBodyMatch[1] : '';
          
          // Infer return type
          const returnType = inferType(jsDoc, methodBody);
          
          // Parse parameters
          const params = parseParameters(methodParams, jsDoc);
          
          methodTypes[className][fullMethodName] = {
            returnType,
            params,
            isStatic
          };
        }
      }
      
      // Extract getters and setters
      const accessorRegex = /(?:static\s+)?(get|set)\s+(\w+)\s*\(([^)]*)\)\s*\{/g;
      let accessorMatch;
      
      while ((accessorMatch = accessorRegex.exec(classBody)) !== null) {
        const isStatic = accessorMatch[0].startsWith('static');
        const accessorType = accessorMatch[1]; // 'get' or 'set'
        const propertyName = accessorMatch[2];
        const accessorParams = accessorMatch[3] || '';
        const accessorStartIndex = classBodyMatch.index + accessorMatch.index;
        
        const fullAccessorName = isStatic ? 
          `static ${accessorType} ${propertyName}` : 
          `${accessorType} ${propertyName}`;
        
        if (!methods[className].includes(fullAccessorName)) {
          methods[className].push(fullAccessorName);
          
          // Extract JSDoc comment
          const jsDoc = extractJSDoc(content, accessorStartIndex);
          methodDocs[className][fullAccessorName] = jsDoc;
          
          // Find accessor body to infer type
          const accessorBodyRegex = new RegExp(`${isStatic ? 'static\\s+' : ''}${accessorType}\\s+${propertyName}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, 'g');
          const accessorBodyMatch = accessorBodyRegex.exec(classBody);
          const accessorBody = accessorBodyMatch ? accessorBodyMatch[1] : '';
          
          // Infer type
          let returnType = inferType(jsDoc, accessorBody);
          
          // For getters, look for return statements
          if (accessorType === 'get' && accessorBody.includes('return')) {
            returnType = inferType(jsDoc, accessorBody);
          }
          
          // For setters, use the parameter type
          const params = accessorType === 'set' ? 
            parseParameters(accessorParams, jsDoc) : 
            [];
          
          methodTypes[className][fullAccessorName] = {
            returnType: accessorType === 'get' ? returnType : 'void',
            params,
            isStatic,
            isAccessor: true,
            accessorType
          };
        }
      }
      
      // Extract properties
      const propertyRegex = /(?:static\s+)?(\w+)\s*=\s*([^;]+);/g;
      let propertyMatch;
      
      while ((propertyMatch = propertyRegex.exec(classBody)) !== null) {
        const isStatic = propertyMatch[0].startsWith('static');
        const propertyName = propertyMatch[1];
        const propertyValue = propertyMatch[2];
        const propertyStartIndex = classBodyMatch.index + propertyMatch.index;
        
        const fullPropertyName = isStatic ? `static ${propertyName}` : propertyName;
        
        if (!properties[className].includes(fullPropertyName)) {
          properties[className].push(fullPropertyName);
          
          // Extract JSDoc comment
          const jsDoc = extractJSDoc(content, propertyStartIndex);
          propertyDocs[className][fullPropertyName] = jsDoc;
          
          // Infer property type
          const propertyType = inferType(jsDoc, propertyValue);
          
          propertyTypes[className][fullPropertyName] = {
            type: propertyType,
            isStatic
          };
        }
      }
    }
  }
  
  // Extract CONFIG.DND5E definitions
  const configRegex = /CONFIG\.DND5E\.(\w+)\s*=\s*{/g;
  let configMatch;
  
  while ((configMatch = configRegex.exec(content)) !== null) {
    const configName = configMatch[1];
    configs[configName] = relativeFile;
  }
  
  // Extract Hooks
  const hookRegex = /Hooks\.(on|once)\s*\(\s*["'](\w+)["']/g;
  let hookMatch;
  
  while ((hookMatch = hookRegex.exec(content)) !== null) {
    const hookType = hookMatch[1];
    const hookName = hookMatch[2];
    
    // Only include DnD5e-specific hooks
    if (hookName.startsWith('dnd5e') || hookName.includes('DND5E')) {
      if (!hooks.some(h => h.name === hookName)) {
        hooks.push({
          name: hookName,
          type: hookType,
          file: relativeFile
        });
      }
    }
  }
  
  // Extract constants
  const constantRegex = /const\s+(\w+)\s*=\s*["']([^"']+)["']/g;
  let constantMatch;
  
  while ((constantMatch = constantRegex.exec(content)) !== null) {
    const constantName = constantMatch[1];
    const constantValue = constantMatch[2];
    
    // Only include constants that look like they might be important
    if (constantName.toUpperCase() === constantName) {
      constants[constantName] = {
        value: constantValue,
        file: relativeFile
      };
    }
  }
});

console.log(`Found ${classes.length} classes in the DnD5e system`);
console.log(`Found ${Object.keys(configs).length} CONFIG.DND5E properties`);
console.log(`Found ${hooks.length} DnD5e-specific hooks`);
console.log(`Found ${Object.keys(constants).length} constants`);

// Generate a report
const report = {
  classes,
  methods,
  methodDocs,
  methodTypes,
  properties,
  propertyDocs,
  propertyTypes,
  configs,
  hooks,
  constants
};

fs.writeFileSync('dnd5e-analysis.json', JSON.stringify(report, null, 2));
console.log('Analysis complete. Report saved to dnd5e-analysis.json');

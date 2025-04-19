/**
 * Script to update type definitions based on the DnD5e system analysis.
 * This version can automatically generate type definitions from the analysis.
 */

const fs = require('fs');
const path = require('path');

// Check if the DnD5e analysis file exists
if (!fs.existsSync('dnd5e-analysis.json')) {
  console.error('DnD5e analysis file not found. Please run the analyze-dnd5e.js script first.');
  process.exit(1);
}

// Load the analysis report
const report = JSON.parse(fs.readFileSync('dnd5e-analysis.json', 'utf8'));

// Load the current DnD5e version
const dnd5eVersion = fs.readFileSync('.dnd5e-version', 'utf8').trim();

console.log(`Updating type definitions for DnD5e v${dnd5eVersion}...`);

// Read package.json but don't update the version
// The version will be updated by Release Please based on conventional commits
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Update the package description with the new DnD5e version
packageJson.description = `TypeScript type definitions for the DnD5e system in Foundry VTT (Compatible with DnD5e v${dnd5eVersion})`;
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

// Create a version.json file to track the DnD5e version compatibility
const versionInfo = {
  dnd5eVersion: dnd5eVersion,
  lastUpdated: new Date().toISOString()
};
fs.writeFileSync('version.json', JSON.stringify(versionInfo, null, 2));

// Update README.md with the new DnD5e version
let readme = fs.readFileSync('README.md', 'utf8');
if (readme.includes('Compatible with DnD5e version')) {
  readme = readme.replace(
    /Compatible with DnD5e version \d+\.\d+\.\d+/,
    `Compatible with DnD5e version ${dnd5eVersion}`
  );
} else {
  // Add compatibility information if it doesn't exist
  const insertPoint = readme.indexOf('## Description');
  if (insertPoint !== -1) {
    const beforeInsert = readme.substring(0, insertPoint + 14); // +14 to include "## Description\n"
    const afterInsert = readme.substring(insertPoint + 14);
    readme = `${beforeInsert}\n\nCompatible with DnD5e version ${dnd5eVersion}\n\n${afterInsert}`;
  } else {
    // Just append to the end if we can't find a good insertion point
    readme += `\n\n## Compatibility\n\nCompatible with DnD5e version ${dnd5eVersion}\n`;
  }
}
fs.writeFileSync('README.md', readme);

console.log(`Updated package.json version to ${packageJson.version}`);
console.log(`Updated README.md with DnD5e version ${dnd5eVersion}`);

// Map of DnD5e class names to our type definition files
const classToFileMap = {
  // Document classes
  'Actor5e': 'src/types/documents/actor5e.d.ts',
  'Item5e': 'src/types/documents/item5e.d.ts',
  'Token5e': 'src/types/documents/token5e.d.ts',
  'ActiveEffect5e': 'src/types/documents/active-effect5e.d.ts',
  'ChatMessage5e': 'src/types/documents/chat-message5e.d.ts',
  'Combat5e': 'src/types/documents/combat5e.d.ts',
  'Combatant5e': 'src/types/documents/combatant5e.d.ts',
  'JournalEntryPage5e': 'src/types/documents/journal-entry-page5e.d.ts',

  // Application classes
  'ActorSheet5e': 'src/types/applications/actor-sheet.d.ts',
  'ActorSheet5eCharacter': 'src/types/applications/actor-sheet.d.ts',
  'ActorSheet5eNPC': 'src/types/applications/actor-sheet.d.ts',
  'ActorSheet5eVehicle': 'src/types/applications/actor-sheet.d.ts',
  'ItemSheet5e': 'src/types/applications/item-sheet.d.ts',
  'Dialog5e': 'src/types/applications/dialog.d.ts',

  // Other classes
  'Tooltips5e': 'src/types/tooltips.d.ts'
};

// Helper function to generate a method declaration
function generateMethodDeclaration(methodName, methodType, jsDoc) {
  let declaration = '';

  // Add JSDoc comment if available
  if (jsDoc) {
    // Clean up JSDoc to remove code examples
    jsDoc = jsDoc.replace(/```[^`]*```/g, '');
    jsDoc = jsDoc.replace(/@example[^@]*(?=@|$)/g, '');

    declaration += '  /**\n';
    jsDoc.split('\n').forEach(line => {
      declaration += `   * ${line}\n`;
    });
    declaration += '   */\n';
  }

  // Check if it's a static method
  const isStatic = methodName.startsWith('static ');
  const actualMethodName = isStatic ? methodName.substring(7) : methodName;

  // Check if it's a getter or setter
  const isGetter = methodName.startsWith('get ');
  const isSetter = methodName.startsWith('set ');

  if (isGetter) {
    const propertyName = methodName.substring(4);
    declaration += `  ${isStatic ? 'static ' : ''}get ${propertyName}(): ${methodType.returnType};\n\n`;
  } else if (isSetter) {
    const propertyName = methodName.substring(4);
    const paramType = methodType.params.length > 0 ? methodType.params[0].type : 'any';
    declaration += `  ${isStatic ? 'static ' : ''}set ${propertyName}(value: ${paramType});\n\n`;
  } else {
    // Regular method
    declaration += `  ${isStatic ? 'static ' : ''}${actualMethodName}(`;

    // Add parameters
    if (methodType.params && methodType.params.length > 0) {
      declaration += methodType.params.map(param => {
        return `${param.name}${param.optional ? '?' : ''}: ${param.type}`;
      }).join(', ');
    }

    declaration += `): ${methodType.returnType};\n\n`;
  }

  return declaration;
}

// Helper function to generate a property declaration
function generatePropertyDeclaration(propertyName, propertyType, jsDoc) {
  let declaration = '';

  // Add JSDoc comment if available
  if (jsDoc) {
    // Clean up JSDoc to remove code examples
    jsDoc = jsDoc.replace(/```[^`]*```/g, '');
    jsDoc = jsDoc.replace(/@example[^@]*(?=@|$)/g, '');

    declaration += '  /**\n';
    jsDoc.split('\n').forEach(line => {
      declaration += `   * ${line}\n`;
    });
    declaration += '   */\n';
  }

  // Check if it's a static property
  const isStatic = propertyName.startsWith('static ');
  const actualPropertyName = isStatic ? propertyName.substring(7) : propertyName;

  declaration += `  ${isStatic ? 'static ' : ''}${actualPropertyName}: ${propertyType.type};\n\n`;

  return declaration;
}

// Helper function to generate a class declaration
function generateClassDeclaration(className, classInfo, methods, methodDocs, methodTypes, properties, propertyDocs, propertyTypes) {
  let declaration = '';

  // Add JSDoc comment if available
  if (classInfo.jsDoc) {
    // Clean up JSDoc to remove code examples
    const jsDoc = classInfo.jsDoc.replace(/```[^`]*```/g, '');

    declaration += '/**\n';
    jsDoc.split('\n').forEach(line => {
      declaration += ` * ${line}\n`;
    });
    declaration += ' */\n';
  } else {
    declaration += `/**\n * The DnD5e ${className} class\n */\n`;
  }

  // Class declaration
  declaration += `export declare class ${className}`;

  // Add extends clause if applicable
  if (classInfo.extends) {
    declaration += ` extends ${classInfo.extends}`;
  }

  declaration += ' {\n';

  // Add properties
  if (properties && properties[className]) {
    properties[className].forEach(propertyName => {
      const propertyType = propertyTypes[className][propertyName];
      const jsDoc = propertyDocs[className][propertyName];
      declaration += generatePropertyDeclaration(propertyName, propertyType, jsDoc);
    });
  }

  // Add methods
  if (methods && methods[className]) {
    methods[className].forEach(methodName => {
      const methodType = methodTypes[className][methodName];
      const jsDoc = methodDocs[className][methodName];
      declaration += generateMethodDeclaration(methodName, methodType, jsDoc);
    });
  }

  declaration += '}\n';

  return declaration;
}

// Process the classes from the report
console.log(`Processing ${report.classes.length} classes...`);

// Track new classes that need to be created
const newClasses = [];

report.classes.forEach(classInfo => {
  const { name } = classInfo;

  // Skip classes that don't match our naming convention
  if (!name.includes('5e') && !name.startsWith('DND5E')) {
    return;
  }

  // Check if we have a type definition for this class
  const typeFile = classToFileMap[name];
  if (!typeFile) {
    console.log(`New class detected: ${name} (extends ${classInfo.extends || 'none'}) in ${classInfo.file}`);
    newClasses.push(classInfo);
    return;
  }

  // Check if the file exists
  if (!fs.existsSync(typeFile)) {
    console.log(`Type definition file not found for ${name}: ${typeFile}`);
    return;
  }

  // Read the current type definition
  const typeContent = fs.readFileSync(typeFile, 'utf8');

  // Check for missing methods
  const classMethods = report.methods[name] || [];
  const classMethodTypes = report.methodTypes[name] || {};
  const classMethodDocs = report.methodDocs[name] || {};

  console.log(`Checking class ${name} for new methods...`);

  const newMethods = [];

  classMethods.forEach(method => {
    // Skip reserved words and constructor
    if (['if', 'for', 'while', 'switch', 'constructor'].includes(method)) {
      return;
    }

    // For declaration files, we're looking for method declarations
    if (!typeContent.includes(`${method}(`) && !typeContent.includes(`${method}: (`)) {
      console.log(`New method detected in ${name}: ${method}`);
      newMethods.push(method);
    }
  });

  // Check for missing properties
  const classProperties = report.properties[name] || [];
  const classPropertyTypes = report.propertyTypes[name] || {};
  const classPropertyDocs = report.propertyDocs[name] || {};

  console.log(`Checking class ${name} for new properties...`);

  const newProperties = [];

  classProperties.forEach(property => {
    // For declaration files, we're looking for property declarations
    if (!typeContent.includes(`${property}:`) && !typeContent.includes(`${property}?:`)) {
      console.log(`New property detected in ${name}: ${property}`);
      newProperties.push(property);
    }
  });

  // If there are new methods or properties, update the file
  if (newMethods.length > 0 || newProperties.length > 0) {
    console.log(`Updating type definition for ${name} with ${newMethods.length} new methods and ${newProperties.length} new properties`);

    // Find the class declaration in the file
    const classRegex = new RegExp(`export\\s+declare\\s+class\\s+${name}[^{]*\\{([\\s\\S]*?)\\n\\}`, 'g');
    const classMatch = classRegex.exec(typeContent);

    if (classMatch) {
      let updatedContent = typeContent;
      let classBody = classMatch[1];
      let insertPoint = classBody.lastIndexOf('\n');

      // Add new properties
      let newContent = '';
      newProperties.forEach(property => {
        const propertyType = classPropertyTypes[property];
        const jsDoc = classPropertyDocs[property];
        newContent += generatePropertyDeclaration(property, propertyType, jsDoc);
      });

      // Add new methods
      newMethods.forEach(method => {
        const methodType = classMethodTypes[method];
        const jsDoc = classMethodDocs[method];
        newContent += generateMethodDeclaration(method, methodType, jsDoc);
      });

      // Insert the new content
      const updatedClassBody = classBody.substring(0, insertPoint) + newContent + classBody.substring(insertPoint);
      updatedContent = typeContent.replace(classBody, updatedClassBody);

      // Write the updated file
      fs.writeFileSync(typeFile, updatedContent);
      console.log(`Updated ${typeFile}`);
    } else {
      console.log(`Could not find class declaration for ${name} in ${typeFile}`);
    }
  }
});

// Create new class files
if (newClasses.length > 0) {
  console.log(`Creating ${newClasses.length} new class files...`);

  newClasses.forEach(classInfo => {
    const { name } = classInfo;

    // Determine the file path
    let filePath;
    if (name.includes('Sheet')) {
      filePath = `src/types/applications/${name.toLowerCase().replace('5e', '-5e')}.d.ts`;
    } else if (name.includes('Effect') || name.includes('Item') || name.includes('Actor') || name.includes('Token') || name.includes('Combat') || name.includes('Journal')) {
      filePath = `src/types/documents/${name.toLowerCase().replace('5e', '-5e')}.d.ts`;
    } else {
      filePath = `src/types/${name.toLowerCase().replace('5e', '-5e')}.d.ts`;
    }

    // Create the directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Generate the class declaration
    const declaration = generateClassDeclaration(
      name,
      classInfo,
      report.methods,
      report.methodDocs,
      report.methodTypes,
      report.properties,
      report.propertyDocs,
      report.propertyTypes
    );

    // Write the file
    fs.writeFileSync(filePath, declaration);
    console.log(`Created ${filePath}`);

    // Add the class to the classToFileMap
    classToFileMap[name] = filePath;
  });

  // Update the appropriate index.d.ts files
  console.log('Updating index files...');

  // Update documents/index.d.ts
  const documentsIndexPath = 'src/types/documents/index.d.ts';
  if (fs.existsSync(documentsIndexPath)) {
    let documentsIndex = fs.readFileSync(documentsIndexPath, 'utf8');
    let documentsExports = '';

    newClasses.forEach(classInfo => {
      const { name } = classInfo;
      if (classToFileMap[name] && classToFileMap[name].includes('documents')) {
        const fileName = path.basename(classToFileMap[name], '.d.ts');
        if (!documentsIndex.includes(`export * from './${fileName}';`)) {
          documentsExports += `export * from './${fileName}';\n`;
        }
      }
    });

    if (documentsExports) {
      documentsIndex += documentsExports;
      fs.writeFileSync(documentsIndexPath, documentsIndex);
      console.log(`Updated ${documentsIndexPath}`);
    }
  }

  // Update applications/index.d.ts
  const applicationsIndexPath = 'src/types/applications/index.d.ts';
  if (fs.existsSync(applicationsIndexPath)) {
    let applicationsIndex = fs.readFileSync(applicationsIndexPath, 'utf8');
    let applicationsExports = '';

    newClasses.forEach(classInfo => {
      const { name } = classInfo;
      if (classToFileMap[name] && classToFileMap[name].includes('applications')) {
        const fileName = path.basename(classToFileMap[name], '.d.ts');
        if (!applicationsIndex.includes(`export * from './${fileName}';`)) {
          applicationsExports += `export * from './${fileName}';\n`;
        }
      }
    });

    if (applicationsExports) {
      applicationsIndex += applicationsExports;
      fs.writeFileSync(applicationsIndexPath, applicationsIndex);
      console.log(`Updated ${applicationsIndexPath}`);
    }
  }

  // Update main index.d.ts if needed
  const mainIndexPath = 'src/types/index.d.ts';
  if (fs.existsSync(mainIndexPath)) {
    let mainIndex = fs.readFileSync(mainIndexPath, 'utf8');
    let mainExports = '';

    newClasses.forEach(classInfo => {
      const { name } = classInfo;
      if (classToFileMap[name] && !classToFileMap[name].includes('documents') && !classToFileMap[name].includes('applications')) {
        const fileName = path.basename(classToFileMap[name], '.d.ts');
        if (!mainIndex.includes(`export * from './${fileName}';`)) {
          mainExports += `export * from './${fileName}';\n`;
        }
      }
    });

    if (mainExports) {
      // Find a good place to insert the exports
      const importIndex = mainIndex.lastIndexOf('import');
      if (importIndex !== -1) {
        const importEndIndex = mainIndex.indexOf(';', importIndex) + 1;
        mainIndex = mainIndex.substring(0, importEndIndex) + '\n' + mainExports + mainIndex.substring(importEndIndex);
      } else {
        mainIndex += '\n' + mainExports;
      }

      fs.writeFileSync(mainIndexPath, mainIndex);
      console.log(`Updated ${mainIndexPath}`);
    }
  }
}

// Process the CONFIG.DND5E properties from the report
console.log(`Processing ${Object.keys(report.configs).length} CONFIG.DND5E properties...`);

// Check for new CONFIG.DND5E properties
const configFile = 'src/types/config/index.d.ts';
if (fs.existsSync(configFile)) {
  const configContent = fs.readFileSync(configFile, 'utf8');

  Object.keys(report.configs).forEach(configName => {
    if (!configContent.includes(`${configName}:`)) {
      console.log(`New CONFIG.DND5E property detected: ${configName}`);

      // TODO: Automatically add the property to the DND5EConfig interface
      // This would require parsing the interface and adding the new property
    }
  });
}

// Fix declaration files to remove implementation details
console.log('Fixing declaration files...');

// Find all declaration files
function findDeclarationFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findDeclarationFiles(filePath, fileList);
    } else if (file.endsWith('.d.ts')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Clean up JSDoc comments to remove code examples
function cleanJSDoc(jsDoc) {
  // Remove code blocks
  jsDoc = jsDoc.replace(/```[^`]*```/g, '');

  // Remove @example blocks
  jsDoc = jsDoc.replace(/@example[^@]*(?=@|$)/g, '');

  // Remove implementation details
  jsDoc = jsDoc.replace(/\*\s+{[^}]*}/g, '');

  return jsDoc;
}

// Fix declaration file
function fixDeclarationFile(filePath) {
  console.log(`Fixing ${filePath}...`);

  let content = fs.readFileSync(filePath, 'utf8');

  // Remove implementation details from methods
  content = content.replace(/(\s*\*\s*[^*\n]+\([^)]*\))\s*{[^}]*}/g, '$1;');

  // Clean up JSDoc comments
  content = content.replace(/\/\*\*[\s\S]*?\*\//g, match => {
    return cleanJSDoc(match);
  });

  // Remove any remaining method implementations
  content = content.replace(/(\w+\s*\([^)]*\))\s*{[\s\S]*?}/g, '$1;');

  // Fix property declarations
  content = content.replace(/(\w+)\s*=\s*[^;]+;/g, '$1: any;');

  // Fix static property declarations
  content = content.replace(/(static\s+\w+)\s*=\s*[^;]+;/g, '$1: any;');

  // Remove any remaining implementation details
  content = content.replace(/\s*if\s*\([^)]*\)\s*{[\s\S]*?}/g, '');
  content = content.replace(/\s*for\s*\([^)]*\)\s*{[\s\S]*?}/g, '');
  content = content.replace(/\s*return\s+[^;]*;/g, '');
  content = content.replace(/\s*const\s+[^;]*;/g, '');
  content = content.replace(/\s*let\s+[^;]*;/g, '');
  content = content.replace(/\s*var\s+[^;]*;/g, '');

  // Write the fixed content back to the file
  fs.writeFileSync(filePath, content);
}

// Find all declaration files
const declarationFiles = findDeclarationFiles('src/types');

// Fix each declaration file
declarationFiles.forEach(fixDeclarationFile);

console.log(`Fixed ${declarationFiles.length} declaration files.`);
console.log('Type definition update complete.');

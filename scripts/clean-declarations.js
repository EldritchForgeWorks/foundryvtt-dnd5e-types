/**
 * This script thoroughly cleans up declaration files to ensure they're valid TypeScript.
 * It removes implementation details, fixes syntax errors, and ensures proper declaration format.
 */

const fs = require('fs');
const path = require('path');

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

// Clean up JSDoc comments
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
function cleanDeclarationFile(filePath) {
  console.log(`Cleaning ${filePath}...`);

  let content = fs.readFileSync(filePath, 'utf8');

  // Step 1: Clean up JSDoc comments
  content = content.replace(/\/\*\*[\s\S]*?\*\//g, match => {
    return cleanJSDoc(match);
  });

  // Step 2: Remove all comment blocks that start with * (these are likely partial JSDoc comments)
  content = content.replace(/\s*\*\s+[^\n]*\n/g, '\n');

  // Step 3: Fix method declarations - ensure they end with semicolons, not curly braces
  content = content.replace(/(\w+\s*\([^)]*\))\s*{[\s\S]*?}/g, '$1;');

  // Step 4: Fix property declarations - ensure they have proper type annotations
  content = content.replace(/(\w+)\s*=\s*[^;]+;/g, '$1: any;');
  content = content.replace(/(static\s+\w+)\s*=\s*[^;]+;/g, '$1: any;');

  // Step 5: Remove any remaining implementation details
  content = content.replace(/\s*if\s*\([^)]*\)\s*{[\s\S]*?}/g, '');
  content = content.replace(/\s*for\s*\([^)]*\)\s*{[\s\S]*?}/g, '');
  content = content.replace(/\s*switch\s*\([^)]*\)\s*{[\s\S]*?}/g, '');
  content = content.replace(/\s*return\s+[^;]*;/g, '');
  content = content.replace(/\s*const\s+[^;]*;/g, '');
  content = content.replace(/\s*let\s+[^;]*;/g, '');
  content = content.replace(/\s*var\s+[^;]*;/g, '');

  // Step 6: Fix getter and setter declarations
  content = content.replace(/get\s+(\w+)\s*\(\)\s*{[\s\S]*?}/g, 'get $1(): any;');
  content = content.replace(/set\s+(\w+)\s*\([^)]*\)\s*{[\s\S]*?}/g, 'set $1(value: any);');

  // Step 7: Fix static getter and setter declarations
  content = content.replace(/static\s+get\s+(\w+)\s*\(\)\s*{[\s\S]*?}/g, 'static get $1(): any;');
  content = content.replace(/static\s+set\s+(\w+)\s*\([^)]*\)\s*{[\s\S]*?}/g, 'static set $1(value: any);');

  // Step 8: Fix method parameter types
  content = content.replace(/(\w+)\s*\(([^)]*)\)\s*:/g, (match, name, params) => {
    // Add types to parameters if they don't have them
    const typedParams = params.split(',').map(param => {
      param = param.trim();
      if (!param) return '';
      if (param.includes(':')) return param; // Already has a type
      return `${param}: any`;
    }).join(', ');

    return `${name}(${typedParams}):`;
  });

  // Step 9: Fix type declarations
  content = content.replace(/export\s+type\s+(\w+):\s*any;/g, 'export type $1 = any;');

  // Step 10: Fix export import declarations
  content = content.replace(/export\s+import\s+(\w+):\s*any;/g, 'export import $1 = any;');

  // Step 11: Remove any remaining problematic code
  content = content.replace(/\${[^}]*}/g, '""');
  content = content.replace(/\);}/g, ');');
  content = content.replace(/\)\);/g, ');');
  content = content.replace(/\);]/g, ');');
  content = content.replace(/\);\.([^;]*);/g, ');');

  // Step 12: Fix parameter types with missing commas
  content = content.replace(/(\w+):\s*(\w+)(\s+\w+):/g, '$1: $2, $3:');

  // Step 13: Fix return types
  content = content.replace(/\):\s*(\w+)\|(\w+);/g, '): $1 | $2;');

  // Step 14: Fix missing semicolons
  content = content.replace(/(\w+):\s*(\w+)\n/g, '$1: $2;\n');

  // Step 15: Fix object types
  content = content.replace(/(\w+):\s*object;/g, '$1: Record<string, any>;');

  // Step 16: Fix array types
  content = content.replace(/(\w+):\s*(\w+)\[\];/g, '$1: $2[];');

  // Step 17: Fix Promise types
  content = content.replace(/(\w+):\s*Promise<(\w+)>;/g, '$1: Promise<$2>;');

  // Write the cleaned content back to the file
  fs.writeFileSync(filePath, content);
}

// Find all declaration files
const declarationFiles = findDeclarationFiles('src/types');

// Clean each declaration file
declarationFiles.forEach(cleanDeclarationFile);

console.log(`Cleaned ${declarationFiles.length} declaration files.`);

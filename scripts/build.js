/**
 * Custom build script to ensure the types folder is properly included in the build
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Clean the dist directory
console.log('Cleaning dist directory...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

// Run TypeScript compiler
console.log('Running TypeScript compiler...');
execSync('tsc', { stdio: 'inherit' });

// Verify the output
console.log('Verifying output...');
if (!fs.existsSync('dist/types')) {
  console.log('Types directory not found in output, creating directory structure...');
  
  // Create the types directory
  fs.mkdirSync('dist/types', { recursive: true });
  
  // Copy all .d.ts files from src/types to dist/types
  function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else if (entry.isFile() && (entry.name.endsWith('.d.ts') || entry.name.endsWith('.js'))) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  copyDir('src/types', 'dist/types');
  
  // Update the index.js and index.d.ts files to use the correct paths
  console.log('Updating index files...');
  
  if (fs.existsSync('dist/index.js')) {
    let indexJs = fs.readFileSync('dist/index.js', 'utf8');
    indexJs = indexJs.replace(/require\("\.\/documents"\)/g, 'require("./types/documents")');
    indexJs = indexJs.replace(/require\("\.\/data"\)/g, 'require("./types/data")');
    indexJs = indexJs.replace(/require\("\.\/config"\)/g, 'require("./types/config")');
    indexJs = indexJs.replace(/require\("\.\/dice"\)/g, 'require("./types/dice")');
    indexJs = indexJs.replace(/require\("\.\/applications"\)/g, 'require("./types/applications")');
    indexJs = indexJs.replace(/require\("\.\/utils"\)/g, 'require("./types/utils")');
    indexJs = indexJs.replace(/require\("\.\/tooltips"\)/g, 'require("./types/tooltips")');
    fs.writeFileSync('dist/index.js', indexJs);
  }
  
  if (fs.existsSync('dist/index.d.ts')) {
    let indexDts = fs.readFileSync('dist/index.d.ts', 'utf8');
    indexDts = indexDts.replace(/from "\.\/documents"/g, 'from "./types/documents"');
    indexDts = indexDts.replace(/from "\.\/data"/g, 'from "./types/data"');
    indexDts = indexDts.replace(/from "\.\/config"/g, 'from "./types/config"');
    indexDts = indexDts.replace(/from "\.\/dice"/g, 'from "./types/dice"');
    indexDts = indexDts.replace(/from "\.\/applications"/g, 'from "./types/applications"');
    indexDts = indexDts.replace(/from "\.\/utils"/g, 'from "./types/utils"');
    indexDts = indexDts.replace(/from "\.\/tooltips"/g, 'from "./types/tooltips"');
    fs.writeFileSync('dist/index.d.ts', indexDts);
  }
}

console.log('Build complete!');

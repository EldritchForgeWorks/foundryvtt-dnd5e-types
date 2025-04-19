/**
 * This script generates a version selector for the documentation.
 * It reads the versions.json file and creates a dropdown menu in each HTML file.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Read the versions.json file
const versionsPath = path.join('docs-versioned', 'versions.json');
if (!fs.existsSync(versionsPath)) {
  console.error('versions.json not found');
  process.exit(1);
}

const versions = JSON.parse(fs.readFileSync(versionsPath, 'utf8'));
versions.sort((a, b) => {
  // Sort versions in descending order (newest first)
  const aParts = a.replace(/^v/, '').split('.').map(Number);
  const bParts = b.replace(/^v/, '').split('.').map(Number);
  
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aVal = aParts[i] || 0;
    const bVal = bParts[i] || 0;
    if (aVal !== bVal) {
      return bVal - aVal; // Descending order
    }
  }
  return 0;
});

// Add "latest" to the beginning
versions.unshift('latest');

// Create the version selector HTML
const createVersionSelector = (currentVersion) => {
  let html = '<div class="version-selector">\n';
  html += '  <label for="version-select">Version:</label>\n';
  html += '  <select id="version-select" onchange="window.location.href=this.value">\n';
  
  versions.forEach(version => {
    const selected = version === currentVersion ? ' selected' : '';
    html += `    <option value="../${version}/"${selected}>${version}</option>\n`;
  });
  
  html += '  </select>\n';
  html += '</div>\n';
  
  // Add some CSS
  html += '<style>\n';
  html += '  .version-selector {\n';
  html += '    position: fixed;\n';
  html += '    top: 10px;\n';
  html += '    right: 10px;\n';
  html += '    z-index: 1000;\n';
  html += '    background-color: #f8f8f8;\n';
  html += '    padding: 5px 10px;\n';
  html += '    border-radius: 4px;\n';
  html += '    box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n';
  html += '  }\n';
  html += '  .version-selector select {\n';
  html += '    margin-left: 5px;\n';
  html += '  }\n';
  html += '</style>\n';
  
  return html;
};

// Process each version directory
versions.forEach(version => {
  if (version === 'latest') return; // Skip the latest symlink
  
  const versionDir = path.join('docs-versioned', version);
  if (!fs.existsSync(versionDir) || !fs.statSync(versionDir).isDirectory()) {
    console.warn(`Directory for version ${version} not found`);
    return;
  }
  
  // Find all HTML files
  const htmlFiles = glob.sync('**/*.html', { cwd: versionDir });
  
  htmlFiles.forEach(htmlFile => {
    const filePath = path.join(versionDir, htmlFile);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Insert the version selector after the <body> tag
    content = content.replace(/<body([^>]*)>/, (match, attributes) => {
      return `<body${attributes}>\n${createVersionSelector(version)}`;
    });
    
    fs.writeFileSync(filePath, content);
  });
  
  console.log(`Added version selector to ${htmlFiles.length} files in version ${version}`);
});

console.log('Version selector generation complete');

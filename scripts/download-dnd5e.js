/**
 * This script downloads a specific version of the DnD5e system and extracts it for analysis.
 * Usage: node scripts/download-dnd5e.js [version]
 * If no version is specified, the latest version will be downloaded.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const AdmZip = require('adm-zip');

// Create tmp directory if it doesn't exist
const tmpDir = path.resolve('tmp');
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

async function getLatestVersion() {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/foundryvtt/dnd5e/master/system.json');
    return response.data.version;
  } catch (error) {
    console.error('Error fetching latest version:', error.message);
    process.exit(1);
  }
}

async function downloadDnD5e(version) {
  console.log(`Downloading DnD5e version ${version}...`);
  
  try {
    // Download the zip file
    const zipUrl = `https://github.com/foundryvtt/dnd5e/archive/refs/tags/release-${version}.zip`;
    const response = await axios.get(zipUrl, { responseType: 'arraybuffer' });
    
    // Save the zip file
    const zipPath = path.resolve(tmpDir, 'dnd5e.zip');
    fs.writeFileSync(zipPath, response.data);
    
    console.log(`Downloaded DnD5e version ${version} to ${zipPath}`);
    
    // Extract the zip file
    const zip = new AdmZip(zipPath);
    const extractPath = path.resolve(tmpDir);
    zip.extractAllTo(extractPath, true);
    
    // Rename the extracted directory to a consistent name
    const extractedDir = path.resolve(extractPath, `dnd5e-release-${version}`);
    const targetDir = path.resolve(extractPath, 'dnd5e-source');
    
    // Remove the target directory if it already exists
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
    
    // Rename the extracted directory
    fs.renameSync(extractedDir, targetDir);
    
    console.log(`Extracted DnD5e version ${version} to ${targetDir}`);
    
    // Update the version file
    fs.writeFileSync('.dnd5e-version', version);
    console.log(`Updated .dnd5e-version file with version ${version}`);
    
    return targetDir;
  } catch (error) {
    console.error('Error downloading DnD5e:', error.message);
    process.exit(1);
  }
}

async function main() {
  // Get the version from the command line arguments or use the latest version
  let version = process.argv[2];
  if (!version) {
    version = await getLatestVersion();
    console.log(`No version specified, using latest version: ${version}`);
  }
  
  const dnd5eDir = await downloadDnD5e(version);
  
  console.log(`\nDnD5e version ${version} downloaded and extracted to ${dnd5eDir}`);
  console.log(`\nYou can now run 'npm run analyze' to analyze the DnD5e system.`);
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});

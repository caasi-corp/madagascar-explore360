
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Preparing build environment...');

// Update browserslist database
console.log('📊 Updating browserslist database...');
try {
  execSync('npx update-browserslist-db@latest', { stdio: 'inherit' });
  console.log('✅ Browserslist database updated successfully');
} catch (error) {
  console.warn('⚠️ Warning: Could not update browserslist database');
  console.warn(error.message);
  // Continue with the build even if this fails
}

// Run the prepare-deployment script
console.log('📦 Running deployment preparation...');
try {
  // Path to the prepare-deployment script
  const prepareDeploymentPath = path.resolve(__dirname, './prepare-deployment.js');
  
  // Check if the script exists
  if (fs.existsSync(prepareDeploymentPath)) {
    execSync(`node ${prepareDeploymentPath}`, { stdio: 'inherit' });
    console.log('✅ Deployment preparation completed');
  } else {
    console.log('⚠️ prepare-deployment.js script not found, skipping...');
  }
} catch (error) {
  console.error('❌ Deployment preparation failed:', error.message);
  process.exit(1);
}

console.log('🎉 Build environment prepared successfully!');

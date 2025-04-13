
#!/usr/bin/env node

// This script runs the entire build process
const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting build process...');

try {
  // Get the path to prepare-deployment.js
  const scriptPath = path.resolve(__dirname, './prepare-deployment.js');
  
  // Run the prepare-deployment script
  console.log('📦 Running deployment preparation...');
  execSync(`node ${scriptPath}`, { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  console.log('📁 The files are ready in the "dist" directory');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

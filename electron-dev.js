
// This is a convenience script to run Electron with wait-on and concurrently
const { spawn } = require('child_process');
const waitOn = require('wait-on');

// Start Vite development server
const viteProcess = spawn('npm', ['run', 'dev'], { shell: true, stdio: 'inherit' });

// Wait for Vite server to be ready
waitOn({ resources: ['http://localhost:8080'] })
  .then(() => {
    console.log('Vite server is ready, starting Electron...');
    // Start Electron
    const electronProcess = spawn('electron', ['electron/main.js'], { shell: true, stdio: 'inherit' });
    
    electronProcess.on('close', (code) => {
      console.log(`Electron process exited with code ${code}`);
      viteProcess.kill();
      process.exit(code);
    });
  })
  .catch((err) => {
    console.error('Error waiting for Vite server:', err);
    viteProcess.kill();
    process.exit(1);
  });


// This script prepares the build for deployment without modifying package.json

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

// Path to the build directory
const DIST_DIR = path.resolve(__dirname, '../../dist');

console.log('🚀 Starting deployment preparation...');

// Run the build command
console.log('📦 Building the application...');
try {
  // Update browserslist database first
  console.log('📊 Updating browserslist database...');
  try {
    childProcess.execSync('npx update-browserslist-db@latest', { stdio: 'inherit' });
    console.log('✅ Browserslist database updated successfully');
  } catch (browserslistError) {
    console.warn('⚠️ Warning: Could not update browserslist database');
    console.warn(browserslistError.message);
    // Continue with the build even if this fails
  }
  
  // Then run the build command
  console.log('🏗️ Running vite build...');
  childProcess.execSync('npx vite build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Create .htaccess file for Apache servers
console.log('📝 Creating .htaccess file...');
const htaccessContent = `
# Rediriger toutes les requêtes non existantes vers index.html pour le routage côté client
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compression GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Mise en cache du navigateur
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/x-javascript "access plus 1 month"
  ExpiresDefault "access plus 2 days"
</IfModule>
`;
fs.writeFileSync(path.join(DIST_DIR, '.htaccess'), htaccessContent.trim());
console.log('✅ .htaccess file created');

// Create web.config file for IIS (Windows servers)
console.log('📝 Creating web.config file...');
const webConfigContent = `<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
            <add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".webp" mimeType="image/webp" />
      <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="30.00:00:00" />
    </staticContent>
  </system.webServer>
</configuration>
`;
fs.writeFileSync(path.join(DIST_DIR, 'web.config'), webConfigContent.trim());
console.log('✅ web.config file created');

// Create README-DEPLOY.md with deployment instructions
console.log('📝 Creating README-DEPLOY.md file...');
const readmeContent = `# Instructions de déploiement

## Structure des fichiers
Cette application est prête à être déployée sur n'importe quel hébergeur web qui prend en charge les applications web statiques.

## Contenu
- \`index.html\`: Point d'entrée de l'application
- \`assets/\`: Contient tous les fichiers JavaScript, CSS et autres ressources
- \`.htaccess\`: Configuration pour les serveurs Apache
- \`web.config\`: Configuration pour les serveurs IIS (Windows)

## Déploiement

### Hébergement standard (Apache, Nginx, etc.)
1. Téléchargez tous les fichiers vers le répertoire racine de votre hébergement web
2. Aucune installation supplémentaire n'est nécessaire

### GitHub Pages
1. Créez un nouveau dépôt GitHub
2. Poussez ces fichiers vers votre dépôt
3. Configurez GitHub Pages pour utiliser la branche principale

### Netlify/Vercel
1. Connectez votre compte GitHub à Netlify/Vercel
2. Sélectionnez ce dépôt et déployez

## Base de données
Cette application utilise IndexedDB pour stocker les données localement dans le navigateur. Aucune configuration de base de données externe n'est nécessaire.

## Remarques spéciales
- L'application est une SPA (Single Page Application) et tous les chemins sont gérés par le client
- Les fichiers .htaccess et web.config sont inclus pour assurer que les routes fonctionnent correctement
- Tous les assets sont pré-compilés et optimisés pour la production
`;
fs.writeFileSync(path.join(DIST_DIR, 'README-DEPLOY.md'), readmeContent.trim());
console.log('✅ README-DEPLOY.md file created');

// Create .nojekyll file for GitHub Pages
console.log('📝 Creating .nojekyll file for GitHub Pages...');
fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');
console.log('✅ .nojekyll file created');

console.log('\n🚀 Deployment preparation completed!');
console.log('📁 The files are ready in the "dist" directory');
console.log('📄 Check README-DEPLOY.md for deployment instructions');

// Run the serve-build script to test locally
console.log('\n🔍 To test the build locally, run:');
console.log('   node src/scripts/serve-build.js');

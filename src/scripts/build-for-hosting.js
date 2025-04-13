
// Ce script sera exécuté après la construction de l'application
// pour préparer les fichiers pour l'hébergement

const fs = require('fs');
const path = require('path');

// Créer un fichier .htaccess pour Apache (utile pour SPA avec react-router)
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

// Créer un fichier web.config pour IIS (utile si hébergement Windows)
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

// Créer un fichier README-DEPLOY.md avec des instructions de déploiement
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

// Chemin du répertoire de build
const buildDir = path.resolve(__dirname, '../../dist');

// Écrire .htaccess
fs.writeFileSync(path.join(buildDir, '.htaccess'), htaccessContent.trim());
console.log('✅ Fichier .htaccess créé');

// Écrire web.config
fs.writeFileSync(path.join(buildDir, 'web.config'), webConfigContent.trim());
console.log('✅ Fichier web.config créé');

// Écrire README-DEPLOY.md
fs.writeFileSync(path.join(buildDir, 'README-DEPLOY.md'), readmeContent.trim());
console.log('✅ Fichier README-DEPLOY.md créé');

// Créer un fichier .nojekyll pour GitHub Pages
fs.writeFileSync(path.join(buildDir, '.nojekyll'), '');
console.log('✅ Fichier .nojekyll créé pour GitHub Pages');

console.log('\n🚀 Build préparé pour le déploiement!');
console.log('📁 Les fichiers sont prêts dans le répertoire "dist"');
console.log('📄 Consultez README-DEPLOY.md pour les instructions de déploiement');

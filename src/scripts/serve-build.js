
// Ce script sert l'application construite localement pour tester la version de production

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const DIST_DIR = path.resolve(__dirname, '../../dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
};

const server = http.createServer((req, res) => {
  console.log(`📝 ${req.method} ${req.url}`);

  // Normaliser l'URL demandée
  let filePath = path.join(DIST_DIR, req.url);
  
  // Gérer le chemin racine
  if (req.url === '/') {
    filePath = path.join(DIST_DIR, 'index.html');
  }
  
  // Gérer les chemins qui n'existent pas (pour SPA avec react-router)
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }
  
  // Obtenir l'extension du fichier
  const extname = String(path.extname(filePath)).toLowerCase();
  
  // Définir l'en-tête Content-Type
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Lire et servir le fichier
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Fichier introuvable
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        // Erreur de serveur
        res.writeHead(500);
        res.end(`Erreur serveur: ${error.code}`);
      }
    } else {
      // Fichier trouvé
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📁 Servir les fichiers depuis: ${DIST_DIR}`);
  console.log(`💡 Appuyez sur Ctrl+C pour arrêter le serveur`);
});

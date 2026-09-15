const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

// 1. Copy from dist/frontend/browser to dist/frontend (so dist/frontend/index.html exists directly)
const browserDir = path.join(__dirname, 'dist', 'frontend', 'browser');
const distFrontendDir = path.join(__dirname, 'dist', 'frontend');
const distRootDir = path.join(__dirname, 'dist');
const rootDistFrontend = path.join(__dirname, '..', 'dist', 'frontend', 'browser');
const rootDist = path.join(__dirname, '..', 'dist');

if (fs.existsSync(browserDir)) {
  console.log('📦 Duplicating build output to eliminate Vercel 404 path issues...');
  
  // Copy to dist/frontend (one level up)
  fs.readdirSync(browserDir).forEach(item => {
    if (item !== 'browser') {
      copyRecursiveSync(path.join(browserDir, item), path.join(distFrontendDir, item));
      copyRecursiveSync(path.join(browserDir, item), path.join(distRootDir, item));
      copyRecursiveSync(path.join(browserDir, item), path.join(rootDistFrontend, item));
      copyRecursiveSync(path.join(browserDir, item), path.join(rootDist, item));
    }
  });

  console.log('✅ Successfully copied index.html and assets to:');
  console.log('   - dist/frontend/browser/index.html');
  console.log('   - dist/frontend/index.html');
  console.log('   - dist/index.html');
}

const fs = require('fs');
const path = require('path');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Copy .next/static to .next/standalone/.next/static
  copyDirRecursive(
    path.join(__dirname, '.next', 'static'),
    path.join(__dirname, '.next', 'standalone', '.next', 'static')
  );

  // Copy public to .next/standalone/public
  copyDirRecursive(
    path.join(__dirname, 'public'),
    path.join(__dirname, '.next', 'standalone', 'public')
  );

  console.log('Build assets copied successfully.');
} catch (err) {
  console.error('Error copying build assets:', err);
  process.exit(1);
}

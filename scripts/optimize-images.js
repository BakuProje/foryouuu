// Script untuk optimize gambar
// Install dependencies: npm install sharp --save-dev
// Run: node scripts/optimize-images.js

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const imageExtensions = ['.jpg', '.jpeg', '.png'];

console.log('🖼️  Image Optimization Script');
console.log('================================\n');

// Check if sharp is installed
try {
  require.resolve('sharp');
  console.log('✅ Sharp is installed\n');
} catch (e) {
  console.log('❌ Sharp is not installed');
  console.log('📦 Install it with: npm install sharp --save-dev\n');
  process.exit(1);
}

const sharp = require('sharp');

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!imageExtensions.includes(ext)) return;

  const fileName = path.basename(filePath);
  const fileSize = fs.statSync(filePath).size;
  
  console.log(`Processing: ${fileName} (${(fileSize / 1024).toFixed(2)} KB)`);

  try {
    // Create WebP version
    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(webpPath);
    
    const webpSize = fs.statSync(webpPath).size;
    console.log(`  ✅ Created WebP: ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize/fileSize) * 100).toFixed(1)}% smaller)`);

    // Optimize original
    const optimizedPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '_optimized$&');
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(filePath)
        .jpeg({ quality: 85, progressive: true })
        .toFile(optimizedPath);
    } else if (ext === '.png') {
      await sharp(filePath)
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(optimizedPath);
    }

    const optimizedSize = fs.statSync(optimizedPath).size;
    console.log(`  ✅ Optimized: ${(optimizedSize / 1024).toFixed(2)} KB (${((1 - optimizedSize/fileSize) * 100).toFixed(1)}% smaller)\n`);

  } catch (error) {
    console.log(`  ❌ Error: ${error.message}\n`);
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (stat.isFile()) {
      await optimizeImage(filePath);
    }
  }
}

console.log('Starting optimization...\n');
processDirectory(publicDir)
  .then(() => {
    console.log('✅ All images processed!');
    console.log('\n💡 Tips:');
    console.log('   - Review the _optimized files');
    console.log('   - Replace originals if satisfied');
    console.log('   - Use .webp versions for better performance');
  })
  .catch(error => {
    console.error('❌ Error:', error);
  });

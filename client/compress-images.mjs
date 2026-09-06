import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDir = path.resolve('public/bouquet_assets');

// Recursively get all .png files inside all subdirectories
function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else if (file.toLowerCase().endsWith('.png')) {
      results.push(fullPath);
    }
  });
  
  return results;
}

async function compressPngAssets() {
  if (!fs.existsSync(targetDir)) {
    console.error(`Directory not found: ${targetDir}`);
    return;
  }

  const files = getFilesRecursively(targetDir);

  if (files.length === 0) {
    console.log('No PNG images found to compress.');
    return;
  }

  console.log(`Optimizing ${files.length} PNG assets while preserving transparency...`);

  for (const filePath of files) {
    const tempFilePath = `${filePath}.temp`;

    await sharp(filePath)
      .resize({
        width: 1200,
        withoutEnlargement: true // Never upscales smaller graphics
      })
      .png({
        quality: 85,          // Perceptual quality
        compressionLevel: 9,  // Maximum zlib compression ratio
        palette: true         // Generates high-efficiency indexed PNGs with transparency
      })
      .toFile(tempFilePath);

    // Overwrite the original file in place
    fs.copyFileSync(tempFilePath, filePath);
    fs.unlinkSync(tempFilePath);

    console.log(`✓ Compressed: ${path.basename(filePath)}`);
  }

  console.log('\nAll bouquet assets optimized without losing transparency!');
}

compressPngAssets().catch(console.error);
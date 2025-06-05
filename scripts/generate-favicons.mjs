import sharp from 'sharp';

// Create a square image with our document icon
const width = 512;
const height = 512;
const background = '#0B0D13';
const iconColor = '#818CF8';

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${background}"/>
  <g transform="translate(156, 106) scale(8.5)" fill="none" stroke="${iconColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <path d="M14 2v6h6"/>
    <path d="M16 13H8"/>
    <path d="M16 17H8"/>
    <path d="M10 9H9"/>
  </g>
</svg>
`;

async function generateFavicons() {
  const sizes = [16, 32, 48, 64, 128, 256];

  try {
    const svgBuffer = Buffer.from(svg);

    // Generate PNG versions
    await sharp(svgBuffer)
      .resize(32, 32)
      .toFile('src/app/favicon.ico');

    await sharp(svgBuffer)
      .resize(180, 180)
      .toFile('public/apple-touch-icon.png');

    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .toFile(`public/favicon-${size}x${size}.png`);
    }

    console.log('✅ Generated all favicon files successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();

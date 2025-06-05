import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

async function generateFaviconFromSVG() {
  const svgContent = await fs.readFile('./public/logo.svg', 'utf-8');
  const svgBuffer = Buffer.from(svgContent);
  const svgBase64 = svgBuffer.toString('base64');

  // Convert SVG to PNG using a third-party service
  const response = await axios.post('https://api.cloudconvert.com/v2/convert', {
    input: {
      format: 'svg',
      data: svgBase64
    },
    output: {
      format: 'png',
      options: {
        width: 512,
        height: 512
      }
    }
  });

  const pngData = response.data;
  await fs.writeFile('./public/logo.png', Buffer.from(pngData, 'base64'));

  console.log('✅ Generated logo.png from SVG!');
}

generateFaviconFromSVG();

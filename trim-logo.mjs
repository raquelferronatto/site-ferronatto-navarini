import sharp from 'sharp';
import { statSync } from 'fs';

await sharp('./assets/logo.png')
    .resize(480, 480, { fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile('./assets/logo-web.png');

const meta = await sharp('./assets/logo-web.png').metadata();
const size = statSync('./assets/logo-web.png').size;
console.log(`logo-web.png criado: ${meta.width}x${meta.height}px — ${(size/1024).toFixed(0)} KB`);

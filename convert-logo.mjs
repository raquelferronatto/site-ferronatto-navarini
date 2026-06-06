import { readFileSync, writeFileSync } from 'fs';
import * as mupdf from 'mupdf';

const pdfData = readFileSync('./logo escritório.pdf');
const doc     = mupdf.Document.openDocument(pdfData, 'application/pdf');
const page    = doc.loadPage(0);

// Scale 4x para alta qualidade
const scale   = 4;
const pixmap  = page.toPixmap(
    mupdf.Matrix.scale(scale, scale),
    mupdf.ColorSpace.DeviceRGB,
    false, // sem alpha
    true   // anti-aliasing
);

const png = pixmap.asPNG();
writeFileSync('./assets/logo.png', png);

const w  = pixmap.getWidth();
const h  = pixmap.getHeight();
const kb = (png.length / 1024).toFixed(0);
console.log(`Logo exportado: assets/logo.png (${kb} KB — ${w}x${h}px)`);

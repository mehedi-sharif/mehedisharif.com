import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import matter from 'gray-matter';
const urls = new Set();
function collect(value) {
  if (typeof value === 'string') {
    for (const match of value.matchAll(/\/images\/[\w./-]+\.(?:jpe?g|png|webp|avif)/gi)) urls.add(match[0]);
  } else if (value && typeof value === 'object') Object.values(value).forEach(collect);
}
async function scan(dir) {
  for (const entry of await fs.readdir(dir,{withFileTypes:true})) {
    const file = path.join(dir,entry.name);
    if (entry.isDirectory()) await scan(file);
    else if (/\.mdx?$/.test(file)) { const {data,content} = matter(await fs.readFile(file,'utf8')); collect(data); collect(content); }
  }
}
await scan('src/content');
await fs.mkdir('public/images/optimized',{recursive:true});
await fs.mkdir('src/generated',{recursive:true});
const manifest = {};
for (const src of urls) {
  let buffer;
  try { buffer = await fs.readFile(`public${src}`); } catch { continue; }
  const metadata = await sharp(buffer).metadata();
  if (!metadata.width || !metadata.height || (metadata.pages || 1) > 1) continue;
  const hash = crypto.createHash('sha256').update(buffer).update('webp-q76-avif-q50-v3').digest('hex').slice(0,16);
  const widths = [...new Set([384,480,640,800,1200].map(w => Math.min(w,metadata.width)))];
  const variants = [];
  for (const width of widths) {
    const url = `/images/optimized/${hash}-${width}.webp`;
    try { await fs.access(`public${url}`); }
    catch { await sharp(buffer).rotate().resize({width,withoutEnlargement:true}).webp({quality:76}).toFile(`public${url}`); }
    const avif = `/images/optimized/${hash}-${width}.avif`;
    try { await fs.access(`public${avif}`); }
    catch { await sharp(buffer).rotate().resize({width,withoutEnlargement:true}).avif({quality:50,effort:4}).toFile(`public${avif}`); }
    variants.push({width,src:url,avif});
  }
  const outputMetadata = await sharp(`public${variants.at(-1).src}`).metadata();
  manifest[src] = {width:outputMetadata.width,height:outputMetadata.height,src:variants.at(-1).src,mobileAvif:variants.filter(v=>v.width<=480).map(v=>`${v.avif} ${v.width}w`).join(', '),avif:variants.map(v=>`${v.avif} ${v.width}w`).join(', '),srcset:variants.map(v=>`${v.src} ${v.width}w`).join(', ')};
}
await fs.writeFile('src/generated/responsive-images.json',JSON.stringify(manifest));
console.log(`Prepared responsive variants for ${Object.keys(manifest).length} content images.`);

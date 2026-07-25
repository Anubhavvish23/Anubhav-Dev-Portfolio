import sharp from 'sharp';
import path from 'path';

const src_path = path.resolve('public', 'dp.png');
const out_path = path.resolve('public', 'hero-portrait.png');

const crop = { left: 2480, top: 1180, width: 1020, height: 1420 };
const threshold = 30;

const { data, info } = await sharp(src_path)
  .extract(crop)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const visited = new Uint8Array(width * height);
const queue = [];

const is_bg = (i) => {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  return r <= threshold && g <= threshold && b <= threshold;
};

const push = (x, y) => {
  const idx = y * width + x;
  if (visited[idx]) return;
  visited[idx] = 1;
  const pix = idx * channels;
  if (is_bg(pix)) queue.push(idx);
};

for (let x = 0; x < width; x++) {
  push(x, 0);
  push(x, height - 1);
}
for (let y = 0; y < height; y++) {
  push(0, y);
  push(width - 1, y);
}

let cleared = 0;
while (queue.length) {
  const idx = queue.pop();
  const pix = idx * channels;
  data[pix + 3] = 0;
  cleared++;

  const x = idx % width;
  const y = (idx / width) | 0;
  if (x > 0) push(x - 1, y);
  if (x < width - 1) push(x + 1, y);
  if (y > 0) push(x, y - 1);
  if (y < height - 1) push(x, y + 1);
}

// soft feather on bottom 12% of opaque content
for (let x = 0; x < width; x++) {
  for (let y = Math.floor(height * 0.78); y < height; y++) {
    const pix = (y * width + x) * channels;
    if (data[pix + 3] === 0) continue;
    const t = (y - height * 0.78) / (height * 0.22);
    const fade = Math.max(0, 1 - t * t);
    data[pix + 3] = Math.round(data[pix + 3] * fade);
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(out_path);

console.log(`saved ${out_path} (${width}x${height}), cleared ${cleared} bg px`);

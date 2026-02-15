import { mkdirSync, readdirSync, statSync, copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function copyDirRecursive(src, dest) {
  if (!existsSync(src)) {
    console.warn(`Source directory does not exist: ${src}`);
    return;
  }
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

const contracts = ['counter', 'recorder', 'voting'];

for (const contract of contracts) {
  const keySrc = join(root, '..', 'recorder-contract', 'src', 'managed', contract, 'keys');
  const keyDest = join(root, 'public', 'midnight', contract, 'keys');
  const zkirSrc = join(root, '..', 'recorder-contract', 'src', 'managed', contract, 'zkir');
  const zkirDest = join(root, 'public', 'midnight', contract, 'zkir');

  if (existsSync(keySrc)) {
    console.log(`Copying keys for ${contract}...`);
    copyDirRecursive(keySrc, keyDest);
  }
  
  if (existsSync(zkirSrc)) {
    console.log(`Copying zkir for ${contract}...`);
    copyDirRecursive(zkirSrc, zkirDest);
  }
}

console.log('Contract keys and zkir files copied successfully.');

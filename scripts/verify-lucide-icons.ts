import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const assetsDir = path.join(repoRoot, 'src/components/Icons/assets');
const lucideDir = path.join(repoRoot, 'node_modules/lucide-static/icons');

const normalizeSvg = (svg: string) =>
  svg.replace(/\r/g, '').replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();

const fail = (message: string) => {
  console.error(message);
  process.exit(1);
};

if (!fs.existsSync(assetsDir)) {
  fail(`Assets directory not found: ${assetsDir}`);
}

if (!fs.existsSync(lucideDir)) {
  fail(
    'Lucide source directory not found. Run `pnpm install` to install lucide-static.',
  );
}

const assetFiles = fs
  .readdirSync(assetsDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

if (assetFiles.length === 0) {
  fail('No icon assets found in src/components/Icons/assets.');
}

const failures: string[] = [];

for (const fileName of assetFiles) {
  const assetPath = path.join(assetsDir, fileName);
  const lucidePath = path.join(lucideDir, fileName);

  if (!fs.existsSync(lucidePath)) {
    failures.push(
      `${fileName}: missing in lucide-static/icons (non-Lucide file name).`,
    );
    continue;
  }

  const assetSvg = normalizeSvg(fs.readFileSync(assetPath, 'utf8'));
  const lucideSvg = normalizeSvg(fs.readFileSync(lucidePath, 'utf8'));

  if (assetSvg !== lucideSvg) {
    failures.push(
      `${fileName}: content does not match lucide-static source (unexpected customization).`,
    );
  }
}

if (failures.length > 0) {
  console.error('Lucide icon verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Verified ${assetFiles.length} Lucide icons.`);

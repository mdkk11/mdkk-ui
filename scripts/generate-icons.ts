import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type SvgAttribute = {
  name: string;
  value: string;
};

type ParsedSvg = {
  attributes: SvgAttribute[];
  innerHtml: string;
};

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const assetsDir = path.join(repoRoot, 'src/components/Icons/assets');
const outputDir = path.join(repoRoot, 'src/components/Icons/generated');

const toCamelCase = (name: string) => {
  const segments = name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((segment) => segment.toLowerCase());

  if (segments.length === 0) return '';
  return segments
    .map((segment, index) =>
      index === 0 ? segment : segment[0].toUpperCase() + segment.slice(1),
    )
    .join('');
};

const toPascalCase = (name: string) => {
  const camelName = toCamelCase(name);
  if (!camelName) return '';
  return camelName[0].toUpperCase() + camelName.slice(1);
};

const toJsxAttributeName = (attributeName: string) => {
  if (attributeName.startsWith('aria-') || attributeName.startsWith('data-')) {
    return attributeName;
  }

  if (attributeName.includes(':')) {
    const [namespace, localName] = attributeName.split(':');
    const pascalLocalName =
      localName[0].toUpperCase() + localName.slice(1).toLowerCase();
    return `${namespace}${pascalLocalName}`;
  }

  return attributeName.replace(/-([a-z])/g, (_match, char) =>
    char.toUpperCase(),
  );
};

const escapeSingleQuote = (value: string) => value.replace(/'/g, '&apos;');

const normalizeSvgMarkup = (markup: string) =>
  markup
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim()
    .replace(/>\s*</g, '>\n<')
    .replace(/\/>/g, ' />')
    .replace(
      /([:@A-Za-z0-9._-]+)\s*=\s*("([^"]*)"|'([^']*)')/g,
      (
        _match,
        name: string,
        _quoted: string,
        double?: string,
        single?: string,
      ) => {
        const value = double ?? single ?? '';
        const jsxAttributeName = toJsxAttributeName(name);
        return `${jsxAttributeName}='${escapeSingleQuote(value)}'`;
      },
    );

const parseSvg = (source: string): ParsedSvg => {
  const match = source.match(/<svg\b([^>]*)>([\s\S]*?)<\/svg>/i);
  if (!match) {
    throw new Error('Invalid SVG file: root <svg> element not found.');
  }

  const attributeSource = match[1] ?? '';
  const innerHtml = (match[2] ?? '').trim();

  const attributes: SvgAttribute[] = [];
  const attributePattern = /([:@A-Za-z0-9._-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
  for (const entry of attributeSource.matchAll(attributePattern)) {
    const rawName = entry[1];
    const value = entry[3] ?? entry[4] ?? '';
    if (rawName === 'width' || rawName === 'height' || rawName === 'class') {
      continue;
    }

    attributes.push({
      name: toJsxAttributeName(rawName),
      value,
    });
  }

  return {
    attributes,
    innerHtml,
  };
};

const createComponentSource = ({
  componentName,
  svg,
}: {
  componentName: string;
  svg: ParsedSvg;
}) => {
  const attrs = svg.attributes
    .map(({ name, value }) => `    ${name}='${escapeSingleQuote(value)}'`)
    .join('\n');

  const normalizedChildren = normalizeSvgMarkup(svg.innerHtml);
  const childrenBlock = normalizedChildren
    ? `${normalizedChildren
        .split('\n')
        .map((line) => `    ${line}`)
        .join('\n')}\n`
    : '';

  return `import type { SVGProps } from 'react';
import * as React from 'react';

export const ${componentName} = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>((props, ref) => (
  /* biome-ignore lint/a11y/noSvgWithoutTitle: generated icon primitive; accessible label is managed by Icon public API. */
  <svg
${attrs}
    ref={ref}
    {...props}
  >
${childrenBlock}  </svg>
));
${componentName}.displayName = '${componentName}';
`;
};

const createRegistrySource = (
  records: Array<{ key: string; componentName: string }>,
) => {
  const importBlock = records
    .toSorted((a, b) => a.componentName.localeCompare(b.componentName))
    .map(
      ({ componentName }) =>
        `import { ${componentName} } from './${componentName}';`,
    )
    .join('\n');

  const names = records.map(({ key }) => `'${key}'`).join(',\n  ');
  const registry = records
    .map(({ key, componentName }) => `  ${key}: ${componentName},`)
    .join('\n');

  return `${importBlock}

export const iconNames = [
  ${names},
] as const;

export type IconName = (typeof iconNames)[number];

export const iconRegistry = {
${registry}
} as const;
`;
};

const run = () => {
  const svgFiles = fs
    .readdirSync(assetsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  if (svgFiles.length === 0) {
    throw new Error('No SVG files found in assets directory.');
  }

  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const seenKeys = new Set<string>();
  const records: Array<{ key: string; componentName: string }> = [];

  for (const fileName of svgFiles) {
    const baseName = fileName.replace(/\.svg$/, '');
    const key = toCamelCase(baseName);
    if (!key) {
      throw new Error(`Unable to derive icon key from file: ${fileName}`);
    }
    if (seenKeys.has(key)) {
      throw new Error(`Duplicate icon key detected: ${key}`);
    }
    seenKeys.add(key);

    const componentName = `${toPascalCase(baseName)}Icon`;
    const sourcePath = path.join(assetsDir, fileName);
    const source = fs.readFileSync(sourcePath, 'utf8');
    const parsedSvg = parseSvg(source);
    const outputPath = path.join(outputDir, `${componentName}.tsx`);

    fs.writeFileSync(
      outputPath,
      `/* AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. */\n${createComponentSource(
        {
          componentName,
          svg: parsedSvg,
        },
      )}`,
      'utf8',
    );

    records.push({ key, componentName });
  }

  const registrySource = createRegistrySource(records);
  fs.writeFileSync(
    path.join(outputDir, 'index.ts'),
    `/* AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. */\n${registrySource}`,
    'utf8',
  );

  const outputLabel = path.relative(repoRoot, outputDir);
  console.log(`Generated ${records.length} icons in ${outputLabel}`);
};

run();

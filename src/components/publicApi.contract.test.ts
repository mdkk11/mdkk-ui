import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = process.cwd();
const publicEntryPath = path.join(repoRoot, 'src/index.ts');

const readSource = (absolutePath: string) =>
  fs.readFileSync(absolutePath, 'utf8');

const resolveExportTarget = (baseDir: string, target: string) => {
  const root = path.resolve(baseDir, target);
  const candidates = [
    `${root}.ts`,
    `${root}.tsx`,
    path.join(root, 'index.ts'),
    path.join(root, 'index.tsx'),
  ];

  const resolved = candidates.find((candidate) => fs.existsSync(candidate));
  if (!resolved) {
    throw new Error(`Unable to resolve export target: ${target}`);
  }
  return resolved;
};

const collectNpmComponentIndexes = () => {
  const source = readSource(publicEntryPath);
  const matches = source.matchAll(
    /export\s+\*\s+from\s+'\.\/components\/([^']+)'/g,
  );

  return [...new Set(Array.from(matches, ([, component]) => component))]
    .map((component) =>
      path.join(repoRoot, 'src/components', component, 'index.ts'),
    )
    .filter((absolutePath) => fs.existsSync(absolutePath))
    .sort();
};

const collectComponentPublicFiles = (componentIndexPath: string) => {
  const source = readSource(componentIndexPath);
  const dir = path.dirname(componentIndexPath);
  const files = new Set<string>([componentIndexPath]);

  for (const match of source.matchAll(/export\s+\*\s+from\s+'(\.\/[^']+)'/g)) {
    files.add(resolveExportTarget(dir, match[1]));
  }

  for (const match of source.matchAll(
    /export\s*\{[\s\S]*?\}\s*from\s+'(\.\/[^']+)'/g,
  )) {
    files.add(resolveExportTarget(dir, match[1]));
  }

  return [...files].sort();
};

const npmComponentIndexes = collectNpmComponentIndexes();
const npmPublicFiles = [
  ...new Set(npmComponentIndexes.flatMap(collectComponentPublicFiles)),
].sort();

describe('public API contract', () => {
  it('collects component indexes reachable from src/index.ts', () => {
    expect(npmComponentIndexes.length).toBeGreaterThan(0);
  });

  it('collects public source files reachable from component indexes', () => {
    expect(npmPublicFiles.length).toBeGreaterThan(0);
  });

  for (const indexPath of npmComponentIndexes) {
    const relativePath = path.relative(repoRoot, indexPath);

    it(`${relativePath} does not re-export primitive modules`, () => {
      const source = readSource(indexPath);

      expect(source).not.toMatch(/export\s+\*\s+from\s+'[^']*Primitive[^']*'/);
      expect(source).not.toMatch(
        /export\s*\{[\s\S]*\b\w*Primitive\w*\b[\s\S]*\}\s*from\s+'[^']+'/,
      );
    });
  }

  for (const filePath of npmPublicFiles) {
    const relativePath = path.relative(repoRoot, filePath);

    it(`${relativePath} does not leak dependency-shaped public types`, () => {
      const source = readSource(filePath);

      expect(source).not.toContain('react-aria-components');
      expect(source).not.toMatch(/\b\w+AdapterProps\b/);
      expect(source).not.toMatch(/\b\w+PrimitiveProps\b/);
      expect(source).not.toMatch(
        /ComponentProps(?:WithRef|WithoutRef)?<\s*typeof\s+\w+Adapter\s*>/,
      );
    });
  }
});

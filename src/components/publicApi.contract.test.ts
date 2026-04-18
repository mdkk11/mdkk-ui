import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const componentsRoot = path.join(process.cwd(), 'src/components');

const publicComponentFiles = fs
  .readdirSync(componentsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((entry) => {
    const componentDir = path.join(componentsRoot, entry.name);
    return fs
      .readdirSync(componentDir, { withFileTypes: true })
      .filter((file) => file.isFile() && file.name.endsWith('.tsx'))
      .map((file) => path.join('src/components', entry.name, file.name));
  })
  .filter(
    (relativePath) =>
      !relativePath.endsWith('Adapter.tsx') &&
      !relativePath.endsWith('Primitive.tsx') &&
      !relativePath.endsWith('.stories.tsx') &&
      !relativePath.endsWith('.test.tsx') &&
      !relativePath.endsWith('Context.tsx'),
  )
  .sort();

describe('public API contract', () => {
  it('collects all public component files', () => {
    expect(publicComponentFiles.length).toBeGreaterThan(0);
  });

  for (const relativePath of publicComponentFiles) {
    it(`${relativePath} does not leak dependency-shaped public types`, () => {
      const source = fs.readFileSync(
        path.join(process.cwd(), relativePath),
        'utf8',
      );

      expect(source).not.toContain('react-aria-components');
      expect(source).not.toMatch(/\b\w+AdapterProps\b/);
      expect(source).not.toMatch(/\b\w+PrimitiveProps\b/);
    });
  }
});

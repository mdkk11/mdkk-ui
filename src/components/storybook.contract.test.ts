import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const componentsRoot = path.join(process.cwd(), 'src/components');
const interactiveStories = new Set([
  'src/components/Button/Button.stories.tsx',
  'src/components/Checkbox/Checkbox.stories.tsx',
  'src/components/Checkbox/CheckboxGroup.stories.tsx',
  'src/components/Combobox/Combobox.stories.tsx',
  'src/components/Dialog/Dialog.stories.tsx',
  'src/components/Drawer/Drawer.stories.tsx',
  'src/components/DropdownMenu/DropdownMenu.stories.tsx',
  'src/components/Select/Select.stories.tsx',
  'src/components/Sidebar/Sidebar.stories.tsx',
  'src/components/Story/Story.stories.tsx',
  'src/components/Tabs/Tabs.stories.tsx',
  'src/components/TextField/TextField.stories.tsx',
  'src/components/Toast/Toast.stories.tsx',
  'src/components/Tooltip/Tooltip.stories.tsx',
]);

const storyFiles = fs
  .readdirSync(componentsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((entry) =>
    fs
      .readdirSync(path.join(componentsRoot, entry.name), {
        withFileTypes: true,
      })
      .filter((file) => file.isFile() && file.name.endsWith('.stories.tsx'))
      .map((file) => path.join('src/components', entry.name, file.name)),
  )
  .sort();

const readSource = (relativePath: string) =>
  fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');

const getMetaBlock = (source: string) =>
  source.match(/const\s+meta[\s\S]*?export\s+default\s+meta;/)?.[0] ?? '';

const hasArgTypesDefaultValueViolation = (source: string) => {
  const lines = source.split('\n');

  return lines.some((line, index) => {
    if (!/^\s*defaultValue\s*:/.test(line)) return false;
    const context = lines.slice(Math.max(0, index - 2), index + 1).join('\n');
    return !/table\s*:/.test(context);
  });
};

describe('storybook standards contract', () => {
  it('collects all component stories', () => {
    expect(storyFiles.length).toBeGreaterThan(0);
  });

  for (const relativePath of storyFiles) {
    it(`${relativePath} has baseline standards`, () => {
      const source = readSource(relativePath);
      const metaBlock = getMetaBlock(source);

      expect(source).toMatch(/title\s*:\s*['"]/);
      expect(metaBlock).toContain("tags: ['autodocs']");
      expect(source).toMatch(/export const Default\s*:/);
      expect(metaBlock).toMatch(/\bargs\s*:\s*\{/);
      expect(hasArgTypesDefaultValueViolation(source)).toBe(false);
    });

    if (interactiveStories.has(relativePath)) {
      it(`${relativePath} has interactive standards`, () => {
        const source = readSource(relativePath);
        expect(source).toMatch(/\bplay\s*:\s*async\b/);
        expect(source).toMatch(/a11y\s*:\s*\{\s*test\s*:\s*['"]error['"]\s*\}/);
      });
    }
  }
});

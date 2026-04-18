import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { cssVariables } from './cssVariables';
import { tokens } from './tokens';

const normalizeWhitespace = (value: string) =>
  value.replace(/\s+/g, ' ').trim();

const rootDir = process.cwd();
const indexCssSource = fs.readFileSync(
  path.join(rootDir, 'src/index.css'),
  'utf8',
);
const tailwindPluginSource = normalizeWhitespace(
  fs.readFileSync(path.join(rootDir, 'src/tailwind-plugin.ts'), 'utf8'),
);

const extractCssBlock = (source: string, selector: string) => {
  const selectorIndex = source.indexOf(selector);
  if (selectorIndex === -1) {
    throw new Error(`Could not find selector: ${selector}`);
  }

  const openBraceIndex = source.indexOf('{', selectorIndex);
  if (openBraceIndex === -1) {
    throw new Error(`Could not find opening brace for selector: ${selector}`);
  }

  let depth = 0;
  for (let index = openBraceIndex; index < source.length; index += 1) {
    const character = source[index];

    if (character === '{') {
      depth += 1;
      continue;
    }

    if (character !== '}') {
      continue;
    }

    depth -= 1;
    if (depth === 0) {
      return source.slice(openBraceIndex + 1, index);
    }
  }

  throw new Error(`Could not find closing brace for selector: ${selector}`);
};

const parseCssVariables = (block: string) => {
  const variables = new Map<string, string>();

  for (const match of block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    const variableName = match[1];
    const variableValue = normalizeWhitespace(match[2]);
    variables.set(variableName, variableValue);
  }

  return variables;
};

const rootCssVariables = parseCssVariables(
  extractCssBlock(indexCssSource, ':root'),
);
const darkCssVariables = parseCssVariables(
  extractCssBlock(indexCssSource, '.dark'),
);

describe('design token consistency', () => {
  it('keeps semantic contracts aligned to the agreed meaning', () => {
    expect(tokens.semantic.light.primary).toBe('var(--color-black)');
    expect(tokens.semantic.light.accent).toBe('var(--brutal-emphasis)');
    expect(tokens.semantic.light.destructive).toBe('var(--color-accent)');
    expect(tokens.semantic.dark.primary).toBe('var(--color-white)');
    expect(tokens.semantic.dark.accent).toBe('var(--brutal-emphasis)');
    expect(tokens.semantic.dark.destructive).toBe('var(--color-accent)');
  });

  it('keeps root and dark CSS variable maps sourced from tokens', () => {
    expect(cssVariables.root['--primary']).toBe(tokens.semantic.light.primary);
    expect(cssVariables.root['--accent']).toBe(tokens.semantic.light.accent);
    expect(cssVariables.root['--destructive']).toBe(
      tokens.semantic.light.destructive,
    );
    expect(cssVariables.dark['--primary']).toBe(tokens.semantic.dark.primary);
    expect(cssVariables.dark['--accent']).toBe(tokens.semantic.dark.accent);
    expect(cssVariables.dark['--destructive']).toBe(
      tokens.semantic.dark.destructive,
    );
  });

  it('uses shared CSS variable maps in tailwind plugin base contract', () => {
    expect(tailwindPluginSource).toContain("':root': cssVariables.root");
    expect(tailwindPluginSource).toContain("'.dark': cssVariables.dark");
  });

  it('keeps root and dark CSS variable keys aligned between cssVariables and index.css', () => {
    expect([...rootCssVariables.keys()].sort()).toEqual(
      Object.keys(cssVariables.root).sort(),
    );
    expect([...darkCssVariables.keys()].sort()).toEqual(
      Object.keys(cssVariables.dark).sort(),
    );
  });

  it('keeps root and dark CSS variable values aligned between cssVariables and index.css', () => {
    for (const [variableName, variableValue] of Object.entries(
      cssVariables.root,
    )) {
      expect(rootCssVariables.get(variableName)).toBe(
        normalizeWhitespace(variableValue),
      );
    }

    for (const [variableName, variableValue] of Object.entries(
      cssVariables.dark,
    )) {
      expect(darkCssVariables.get(variableName)).toBe(
        normalizeWhitespace(variableValue),
      );
    }
  });
});

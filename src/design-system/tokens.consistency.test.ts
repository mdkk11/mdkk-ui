import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { cssVariables } from './cssVariables';
import { tokens } from './tokens';

const normalizeWhitespace = (value: string) =>
  value.replace(/\s+/g, ' ').trim();

const rootDir = process.cwd();
const indexCssSource = normalizeWhitespace(
  fs.readFileSync(path.join(rootDir, 'src/index.css'), 'utf8'),
);
const tailwindPluginSource = normalizeWhitespace(
  fs.readFileSync(path.join(rootDir, 'src/tailwind-plugin.ts'), 'utf8'),
);

const expectCssDeclaration = (
  source: string,
  variableName: string,
  value: string,
) => {
  expect(source).toContain(`${variableName}: ${value};`);
};

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
    expect(cssVariables.root['--font-sans']).toBe(tokens.base.font.sans);
    expect(cssVariables.root['--font-mono']).toBe(tokens.base.font.mono);
    expect(cssVariables.root['--brutal-canvas']).toBe(
      tokens.brutalist.colors.light.canvas,
    );
    expect(cssVariables.root['--brutal-grid-line']).toBe('rgb(0 0 0 / 8%)');

    expect(cssVariables.dark['--primary']).toBe(tokens.semantic.dark.primary);
    expect(cssVariables.dark['--accent']).toBe(tokens.semantic.dark.accent);
    expect(cssVariables.dark['--destructive']).toBe(
      tokens.semantic.dark.destructive,
    );
    expect(cssVariables.dark['--brutal-canvas']).toBe(
      tokens.brutalist.colors.dark.canvas,
    );
    expect(cssVariables.dark['--brutal-grid-line']).toBe(
      'rgb(255 255 255 / 9%)',
    );
  });

  it('uses shared CSS variable maps in tailwind plugin base contract', () => {
    expect(tailwindPluginSource).toContain("':root': cssVariables.root");
    expect(tailwindPluginSource).toContain("'.dark': cssVariables.dark");
  });

  it('keeps index.css declarations aligned with token contracts', () => {
    expectCssDeclaration(
      indexCssSource,
      '--primary',
      tokens.semantic.light.primary,
    );
    expectCssDeclaration(
      indexCssSource,
      '--accent',
      tokens.semantic.light.accent,
    );
    expectCssDeclaration(
      indexCssSource,
      '--destructive',
      tokens.semantic.light.destructive,
    );
    expectCssDeclaration(indexCssSource, '--font-sans', tokens.base.font.sans);
    expectCssDeclaration(indexCssSource, '--font-mono', tokens.base.font.mono);
    expectCssDeclaration(
      indexCssSource,
      '--brutal-canvas',
      tokens.brutalist.colors.light.canvas,
    );
    expectCssDeclaration(
      indexCssSource,
      '--brutal-grid-line',
      cssVariables.root['--brutal-grid-line'],
    );

    expectCssDeclaration(
      indexCssSource,
      '--primary',
      tokens.semantic.dark.primary,
    );
    expectCssDeclaration(
      indexCssSource,
      '--accent',
      tokens.semantic.dark.accent,
    );
    expectCssDeclaration(
      indexCssSource,
      '--destructive',
      tokens.semantic.dark.destructive,
    );
    expectCssDeclaration(
      indexCssSource,
      '--brutal-canvas',
      tokens.brutalist.colors.dark.canvas,
    );
    expectCssDeclaration(
      indexCssSource,
      '--brutal-grid-line',
      cssVariables.dark['--brutal-grid-line'],
    );
  });
});

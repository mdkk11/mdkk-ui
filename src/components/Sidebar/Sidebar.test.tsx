import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { SidebarProviderProps, SidebarRootProps } from './Sidebar';
import { Sidebar } from './Sidebar';

type MatchMediaOptions = {
  width: number;
  coarse?: boolean;
};

const installMatchMedia = ({ width, coarse = false }: MatchMediaOptions) => {
  const matchMedia = vi.fn().mockImplementation((query: string) => {
    const maxWidthMatch = query.match(/\(max-width:\s*(\d+)px\)/);
    const maxWidth = maxWidthMatch
      ? Number(maxWidthMatch[1])
      : Number.POSITIVE_INFINITY;
    const matchesWidth = width <= maxWidth;
    const matchesTouchOnly =
      !query.includes('(hover: none)') || !query.includes('(pointer: coarse)')
        ? true
        : coarse;

    return {
      matches: matchesWidth && matchesTouchOnly,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList;
  });

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: matchMedia,
  });
};

type SidebarHarnessProps = {
  providerProps?: Partial<SidebarProviderProps>;
  rootProps?: Partial<SidebarRootProps>;
};

const SidebarHarness = ({
  providerProps = {},
  rootProps = {},
}: SidebarHarnessProps) => (
  <Sidebar.Provider defaultWidth={280} minWidth={220} {...providerProps}>
    <Sidebar.Trigger>Global toggle</Sidebar.Trigger>
    <Sidebar.Root {...rootProps}>
      <Sidebar.Panel>
        <Sidebar.Header>
          <h2>Workspace</h2>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Nav>
            <Sidebar.List>
              <Sidebar.Item>
                <Sidebar.ItemButton>Dashboard</Sidebar.ItemButton>
              </Sidebar.Item>
              <Sidebar.Item>
                <Sidebar.ItemButton>Projects</Sidebar.ItemButton>
              </Sidebar.Item>
              <Sidebar.Item>
                <Sidebar.ItemButton>Settings</Sidebar.ItemButton>
              </Sidebar.Item>
            </Sidebar.List>
          </Sidebar.Nav>
        </Sidebar.Content>
        <Sidebar.Footer>
          <p>Signed in as koki</p>
        </Sidebar.Footer>
        <Sidebar.ResizeHandle />
      </Sidebar.Panel>
      <main data-sidebar-background>
        <button type='button'>Background action</button>
      </main>
    </Sidebar.Root>
  </Sidebar.Provider>
);

describe('Sidebar', () => {
  it('keeps desktop collapse and resize behavior intact', async () => {
    installMatchMedia({ width: 1440 });
    const user = userEvent.setup();
    const { container } = render(<SidebarHarness />);

    const trigger = screen.getByRole('button', { name: 'Global toggle' });
    const panel = container.querySelector('aside');
    const resizeHandle = screen.getByLabelText('Resize sidebar');

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(panel).toHaveStyle({ width: '280px' });
    expect(resizeHandle).toBeInTheDocument();

    fireEvent.mouseDown(resizeHandle, { clientX: 280 });
    fireEvent.mouseMove(document, { clientX: 340 });
    fireEvent.mouseUp(document);

    await waitFor(() => expect(panel).toHaveStyle({ width: '340px' }));

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(panel).toHaveAttribute('aria-hidden', 'true');
    expect(panel).toHaveStyle({ width: '0px' });
  });

  it('applies right-side layout when side is right', async () => {
    installMatchMedia({ width: 1440 });
    const { container } = render(
      <SidebarHarness rootProps={{ side: 'right' }} />,
    );

    const panel = container.querySelector('aside');
    const shell = panel?.parentElement;
    const resizeHandle = screen.getByLabelText('Resize sidebar');

    expect(shell?.className).toContain('flex-row-reverse');
    expect(panel).toHaveAttribute('data-side', 'right');
    expect(resizeHandle.className).toContain('-left-1.5');
  });

  it('treats viewport mobile as a dialog and traps focus', async () => {
    installMatchMedia({ width: 480 });
    const user = userEvent.setup();
    const { container } = render(
      <SidebarHarness
        providerProps={{
          mobileBreakpoint: 768,
          mobileDetection: 'viewport',
        }}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Global toggle' });
    const background = container.querySelector(
      '[data-sidebar-background]',
    ) as HTMLElement;

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog'),
    );

    await user.click(trigger);

    const dialog = await screen.findByRole('dialog', { name: 'Sidebar' });
    const dashboard = screen.getByRole('button', { name: 'Dashboard' });
    const projects = screen.getByRole('button', { name: 'Projects' });
    const settings = screen.getByRole('button', { name: 'Settings' });

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(background).toHaveAttribute('aria-hidden', 'true');
    expect(background).toHaveAttribute('inert');

    await waitFor(() => expect(dashboard).toHaveFocus());

    await user.tab();
    expect(projects).toHaveFocus();

    await user.tab();
    expect(settings).toHaveFocus();

    await user.tab();
    expect(dashboard).toHaveFocus();

    await user.keyboard('{Escape}');

    await waitFor(() =>
      expect(
        screen.queryByRole('dialog', { name: 'Sidebar' }),
      ).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());

    expect(background).not.toHaveAttribute('aria-hidden');
    expect(background).not.toHaveAttribute('inert');
  });

  it('keeps mobile item presses open by default', async () => {
    installMatchMedia({ width: 480 });
    const user = userEvent.setup();
    render(
      <SidebarHarness
        providerProps={{
          mobileBreakpoint: 768,
          mobileDetection: 'viewport',
        }}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Global toggle' }));
    await screen.findByRole('dialog', { name: 'Sidebar' });

    await user.click(screen.getByRole('button', { name: 'Dashboard' }));

    expect(screen.getByRole('dialog', { name: 'Sidebar' })).toBeInTheDocument();
  });

  it('can auto-close mobile sidebar after item press', async () => {
    installMatchMedia({ width: 480 });
    const user = userEvent.setup();
    const { queryByRole } = render(
      <SidebarHarness
        providerProps={{
          mobileBreakpoint: 768,
          mobileDetection: 'viewport',
          isMobileAutoCloseOnItemPress: true,
        }}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Global toggle' });

    await user.click(trigger);
    await screen.findByRole('dialog', { name: 'Sidebar' });

    await user.click(screen.getByRole('button', { name: 'Dashboard' }));

    await waitFor(() =>
      expect(
        queryByRole('dialog', { name: 'Sidebar' }),
      ).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
  });
});

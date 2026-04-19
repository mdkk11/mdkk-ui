import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import { Sidebar, SidebarTrigger, useSidebar } from './Sidebar';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from './SidebarGroup';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar.Root,
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Compound API: `Sidebar.Provider`, `Sidebar.Root`, `Sidebar.Panel`, `Sidebar.Header`, `Sidebar.Content`, `Sidebar.Footer`, `Sidebar.Trigger`, `Sidebar.ResizeHandle`, `Sidebar.Nav`, `Sidebar.List`, `Sidebar.Item`, `Sidebar.ItemButton`.',
      },
    },
  },
  subcomponents: {
    'Sidebar.Provider': Sidebar.Provider,
    'Sidebar.Panel': Sidebar.Panel,
    'Sidebar.Header': Sidebar.Header,
    'Sidebar.Content': Sidebar.Content,
    'Sidebar.Footer': Sidebar.Footer,
    'Sidebar.Trigger': Sidebar.Trigger,
    'Sidebar.ResizeHandle': Sidebar.ResizeHandle,
    'Sidebar.Nav': Sidebar.Nav,
    'Sidebar.List': Sidebar.List,
    'Sidebar.Item': Sidebar.Item,
    'Sidebar.ItemButton': Sidebar.ItemButton,
    'Sidebar.Group': Sidebar.Group,
    'Sidebar.GroupLabel': Sidebar.GroupLabel,
    'Sidebar.GroupContent': Sidebar.GroupContent,
  },
  tags: ['autodocs'],
  args: {
    side: 'left',
    defaultIsCollapsed: false,
    defaultWidth: 280,
    collapsedWidth: 0,
    minWidth: 220,
    maxWidth: 420,
    isResizable: true,
    mobileBreakpoint: 768,
    mobileDetection: 'viewport',
    defaultMobileOpen: false,
    isMobileAutoCloseOnItemPress: false,
  },
  argTypes: {
    side: {
      control: 'radio',
      options: ['left', 'right'],
    },
    defaultIsCollapsed: { control: 'boolean' },
    defaultWidth: { control: 'number' },
    collapsedWidth: { control: 'number' },
    minWidth: { control: 'number' },
    maxWidth: { control: 'number' },
    isResizable: { control: 'boolean' },
    mobileBreakpoint: { control: 'number' },
    mobileDetection: {
      control: 'radio',
      options: ['viewport', 'touch-viewport'],
    },
    defaultMobileOpen: { control: 'boolean' },
    isMobileAutoCloseOnItemPress: { control: 'boolean' },
  },
} satisfies Meta<typeof Sidebar.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const StatefulSidebarTrigger = () => {
  const { isCollapsed, isMobile, isMobileOpen } = useSidebar();
  const label = isMobile
    ? isMobileOpen
      ? 'Close'
      : 'Open'
    : isCollapsed
      ? 'Open'
      : 'Close';

  return <SidebarTrigger>{label}</SidebarTrigger>;
};

export const Default: Story = {
  render: () => {
    return (
      <div className='min-h-screen p-6'>
        <Sidebar.Root className='border'>
          <Sidebar.Panel>
            <Sidebar.Header>
              <h2 className='text-lg font-semibold'>Workspace</h2>
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
              <p className='text-xs text-muted-foreground'>Signed in as koki</p>
            </Sidebar.Footer>
            <Sidebar.ResizeHandle />
          </Sidebar.Panel>
          <main className='flex-1 p-4'>
            <Sidebar.Trigger />
            <h1 className='mt-4 text-2xl font-bold'>Main content</h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              Compound Component API sample for the design system.
            </p>
          </main>
        </Sidebar.Root>
      </div>
    );
  },
};

export const Collapsed: Story = {
  render: () => (
    <div className='min-h-screen p-6'>
      <Sidebar.Root defaultIsCollapsed className='h-[360px] rounded-lg border'>
        <Sidebar.Panel>
          <Sidebar.Header>
            <h2 className='text-xl font-bold'>App Name</h2>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Nav>
              <Sidebar.List>
                <Sidebar.Item>
                  <Sidebar.ItemButton isActive>Home</Sidebar.ItemButton>
                </Sidebar.Item>
                <Sidebar.Item>
                  <Sidebar.ItemButton>Inbox</Sidebar.ItemButton>
                </Sidebar.Item>
              </Sidebar.List>
            </Sidebar.Nav>
          </Sidebar.Content>
        </Sidebar.Panel>
        <main className='flex-1 p-4'>
          <Sidebar.Trigger />
        </main>
      </Sidebar.Root>
    </div>
  ),
};

export const GroupedSections: Story = {
  render: () => (
    <div className='min-h-screen p-6'>
      <Sidebar.Root className='h-[420px] rounded-lg border'>
        <Sidebar.Panel>
          <Sidebar.Header>
            <h2 className='text-lg font-semibold'>Workspace</h2>
          </Sidebar.Header>
          <Sidebar.Content>
            <SidebarGroup>
              <SidebarGroupLabel>General</SidebarGroupLabel>
              <SidebarGroupContent>
                <Sidebar.Nav>
                  <Sidebar.List>
                    <Sidebar.Item>
                      <Sidebar.ItemButton isActive>
                        Dashboard
                      </Sidebar.ItemButton>
                    </Sidebar.Item>
                    <Sidebar.Item>
                      <Sidebar.ItemButton>Projects</Sidebar.ItemButton>
                    </Sidebar.Item>
                  </Sidebar.List>
                </Sidebar.Nav>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <Sidebar.Nav>
                  <Sidebar.List>
                    <Sidebar.Item>
                      <Sidebar.ItemButton>Members</Sidebar.ItemButton>
                    </Sidebar.Item>
                    <Sidebar.Item>
                      <Sidebar.ItemButton>Settings</Sidebar.ItemButton>
                    </Sidebar.Item>
                  </Sidebar.List>
                </Sidebar.Nav>
              </SidebarGroupContent>
            </SidebarGroup>
          </Sidebar.Content>
        </Sidebar.Panel>
        <main className='flex-1 p-4'>
          <Sidebar.Trigger />
          <p className='mt-4 text-sm text-muted-foreground'>
            Example of grouping navigation items by section headers.
          </p>
        </main>
      </Sidebar.Root>
    </div>
  ),
};

export const TriggerWithStateLabel: Story = {
  render: () => (
    <div className='min-h-screen p-6'>
      <Sidebar.Root className='h-[420px] rounded-lg border'>
        <Sidebar.Panel>
          <Sidebar.Header>
            <h2 className='text-lg font-semibold'>Workspace</h2>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Nav>
              <Sidebar.List>
                <Sidebar.Item>
                  <Sidebar.ItemButton isActive>Dashboard</Sidebar.ItemButton>
                </Sidebar.Item>
                <Sidebar.Item>
                  <Sidebar.ItemButton>Projects</Sidebar.ItemButton>
                </Sidebar.Item>
              </Sidebar.List>
            </Sidebar.Nav>
          </Sidebar.Content>
        </Sidebar.Panel>
        <main className='flex-1 p-4'>
          <StatefulSidebarTrigger />
          <p className='mt-4 text-sm text-muted-foreground'>
            Example of switching trigger labels from `useSidebar` state.
          </p>
        </main>
      </Sidebar.Root>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
    await expect(canvas.getByRole('button', { name: 'Open' })).toBeVisible();
  },
};

export const ProviderWithExternalTrigger: Story = {
  render: () => (
    <Sidebar.Provider defaultWidth={280} minWidth={220}>
      <div className='flex min-h-screen flex-col p-6'>
        <header className='mb-4 flex items-center justify-between rounded-lg border bg-background p-3'>
          <StatefulSidebarTrigger />
          <p className='text-sm text-muted-foreground'>
            Trigger is outside Sidebar.Root
          </p>
        </header>
        <Sidebar.Root className='min-h-0 flex-1 rounded-lg border'>
          <Sidebar.Panel>
            <Sidebar.Header>
              <h2 className='text-lg font-semibold'>Workspace</h2>
            </Sidebar.Header>
            <Sidebar.Content>
              <Sidebar.Nav>
                <Sidebar.List>
                  <Sidebar.Item>
                    <Sidebar.ItemButton isActive>Dashboard</Sidebar.ItemButton>
                  </Sidebar.Item>
                  <Sidebar.Item>
                    <Sidebar.ItemButton>Projects</Sidebar.ItemButton>
                  </Sidebar.Item>
                </Sidebar.List>
              </Sidebar.Nav>
            </Sidebar.Content>
            <Sidebar.ResizeHandle />
          </Sidebar.Panel>
          <main className='flex-1 p-4'>
            <p className='text-sm text-muted-foreground'>
              shadcn-style composition: provider owns state, root owns layout.
            </p>
          </main>
        </Sidebar.Root>
      </div>
    </Sidebar.Provider>
  ),
};

export const MobileViewport: Story = {
  render: () => (
    <Sidebar.Provider
      defaultMobileOpen
      defaultWidth={280}
      minWidth={220}
      mobileBreakpoint={99999}
      mobileDetection='viewport'
    >
      <div className='min-h-screen p-6'>
        <header className='mb-4 flex items-center justify-between rounded-lg border bg-background p-3'>
          <StatefulSidebarTrigger />
          <p className='text-sm text-muted-foreground'>
            Mobile dialog preview with an external trigger
          </p>
        </header>
        <Sidebar.Root className='min-h-[560px] rounded-lg border'>
          <Sidebar.Panel>
            <Sidebar.Header>
              <h2 className='text-lg font-semibold'>Workspace</h2>
            </Sidebar.Header>
            <Sidebar.Content>
              <Sidebar.Nav>
                <Sidebar.List>
                  <Sidebar.Item>
                    <Sidebar.ItemButton isActive>Dashboard</Sidebar.ItemButton>
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
              <p className='text-xs text-muted-foreground'>Mobile preview</p>
            </Sidebar.Footer>
          </Sidebar.Panel>
          <main className='flex-1 p-4'>
            <p className='text-sm text-muted-foreground'>
              The sidebar opens as a dialog on mobile-sized viewports.
            </p>
          </main>
        </Sidebar.Root>
      </div>
    </Sidebar.Provider>
  ),
};

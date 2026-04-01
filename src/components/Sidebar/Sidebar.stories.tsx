import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarTrigger, useSidebar } from './Sidebar';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from './SidebarGroup';

const meta = {
  title: 'Components/Sidebar',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const StatefulSidebarTrigger = () => {
  const { isCollapsed, isMobile, isMobileOpen } = useSidebar();
  const label = isMobile
    ? isMobileOpen
      ? 'とじる'
      : 'ひらく'
    : isCollapsed
      ? 'ひらく'
      : 'とじる';

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
            SidebarGroup で項目を見出しごとに分割する例。
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
            useSidebar で状態を読み、Triggerラベルを切り替える例。
          </p>
        </main>
      </Sidebar.Root>
    </div>
  ),
};

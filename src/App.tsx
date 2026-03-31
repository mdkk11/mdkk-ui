import { useState } from 'react';
import { AspectRatio } from './components/AspectRatio';
import { Checkbox } from './components/Checkbox/Checkbox';
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
} from './components/Sidebar';
import { Story, type StorySet } from './components/Story';
import { TextArea } from './components/TextArea';
import { TextField } from './components/TextField';

// Mock Data
const mockStorySet: StorySet = {
  id: 'story-set-1',
  title: 'My Story',
  thumbnail:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
  stories: [
    {
      id: 'story-1',
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
      duration: 3000,
    },
    {
      id: 'story-2',
      type: 'markdown',
      content: '# Hello World\n\nThis is a markdown story.',
      backgroundColor: '#1a202c',
      duration: 5000,
    },
  ],
};

function App() {
  const [sidebarLog, setSidebarLog] = useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(280);

  const pushLog = (message: string) => {
    setSidebarLog((prev) => [message, ...prev].slice(0, 5));
  };

  return (
    <Sidebar.Root
      className='h-screen min-h-screen'
      isCollapsed={isSidebarCollapsed}
      onCollapsedChange={setIsSidebarCollapsed}
      defaultWidth={280}
      minWidth={220}
      onWidthChange={setSidebarWidth}
    >
      <Sidebar.Panel>
        <Sidebar.Header>
          <h2 className='text-sm font-semibold'>mdkk workspace</h2>
          <p className='text-xs text-muted-foreground'>Pages and shortcuts</p>
        </Sidebar.Header>
        <Sidebar.Content>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <Sidebar.Nav>
                <Sidebar.List>
                  <Sidebar.Item>
                    <Sidebar.ItemButton
                      isActive
                      onPress={() => pushLog('Clicked: Home')}
                    >
                      Home
                    </Sidebar.ItemButton>
                  </Sidebar.Item>
                  <Sidebar.Item>
                    <Sidebar.ItemButton
                      onPress={() => pushLog('Clicked: Search')}
                    >
                      Search
                    </Sidebar.ItemButton>
                  </Sidebar.Item>
                </Sidebar.List>
              </Sidebar.Nav>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <Sidebar.Nav>
                <Sidebar.List>
                  <Sidebar.Item>
                    <Sidebar.ItemButton
                      onPress={() => pushLog('Clicked: Settings')}
                    >
                      Settings
                    </Sidebar.ItemButton>
                  </Sidebar.Item>
                </Sidebar.List>
              </Sidebar.Nav>
            </SidebarGroupContent>
          </SidebarGroup>
        </Sidebar.Content>
        <Sidebar.Footer>
          <div className='text-xs text-muted-foreground'>
            Resizable sidebar sample
          </div>
        </Sidebar.Footer>
        <Sidebar.ResizeHandle />
      </Sidebar.Panel>

      <div className='flex-1 overflow-y-auto p-12'>
        <div className='flex items-center justify-between gap-4'>
          <SidebarTrigger />
          <h1 className='text-3xl font-bold'>mdkk-ui Dev Preview</h1>
        </div>
        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>Sidebar Compound API</h2>
          <div className='rounded-lg border bg-muted/40 p-3 text-xs'>
            <div className='font-medium'>Sidebar Debug</div>
            <div>collapsed: {String(isSidebarCollapsed)}</div>
            <div>width: {sidebarWidth}px</div>
          </div>
          <div className='rounded-lg border bg-background p-3 text-sm text-muted-foreground'>
            <div className='mb-2 font-medium text-foreground'>
              Sidebar Event Log
            </div>
            {sidebarLog.length === 0 ? (
              <div>Click an action button to see events.</div>
            ) : (
              <ul className='space-y-1'>
                {sidebarLog.map((log, index) => (
                  <li key={`${log}-${index * 2}`}>{log}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
        <TextField.Root className='flex flex-row w-full'>
          <TextField.Label>Feedback</TextField.Label>
          <div className='w-full'>
            <TextArea className='w-full' />
            <TextField.Description>
              Please provide as much detail as possible.
            </TextField.Description>
          </div>
        </TextField.Root>
        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>Single Story</h2>
          <div className='w-[150px]'>
            <Story storySet={mockStorySet}>
              <AspectRatio ratio={9 / 16}>
                <Story.Trigger />
                <Story.Overlay />
                <Story.Content>
                  <Story.Header />
                  <Story.ProgressBar />
                  <Story.Body />
                  <Story.Navigation />
                </Story.Content>
              </AspectRatio>
            </Story>
          </div>
        </section>
        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>Checkbox</h2>
          <div className='flex gap-4'>
            <Checkbox>Checkbox</Checkbox>
          </div>
        </section>
      </div>
    </Sidebar.Root>
  );
}

export default App;

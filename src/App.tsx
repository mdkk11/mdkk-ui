import { AspectRatio } from './components/AspectRatio';
import { Badge } from './components/Badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/Card';
import { Checkbox } from './components/Checkbox/Checkbox';
import { Sidebar } from './components/Sidebar';
import { Story, type StorySet } from './components/Story';
import { TextArea } from './components/TextArea';
import { TextField } from './components/TextField';
import { Layout } from './Layout';

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

const demoGroupIds = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
];

const sidebarItemBaseClass =
  'brutal-chip w-full px-2 py-1.5 text-left text-xs transition-colors';

const sectionHeadingClass = 'brutal-heading font-heading text-base';

const SidebarToggleButton = () => {
  const { isCollapsed, isMobile, isMobileOpen } = Sidebar.useSidebar();
  const label = isMobile
    ? isMobileOpen
      ? 'とじる'
      : 'ひらく'
    : isCollapsed
      ? 'ひらく'
      : 'とじる';

  return <Sidebar.Trigger aria-label={label} title={label} />;
};

function App() {
  return (
    <Layout>
      <div className='brutal-canvas flex min-h-0 flex-1 flex-col'>
        <div className='brutal-topbar flex items-center justify-between gap-3 px-4 py-2.5'>
          <SidebarToggleButton />
          <div className='flex items-center gap-2'>
            <span className='brutal-chip-inverse brutal-label px-1.5 py-0.5 text-[10px]'>
              Raw
            </span>
            <h1 className='brutal-heading m-0 font-heading text-[clamp(1.2rem,2.5vw,2rem)]'>
              mdkk-ui Brutalist Lab
            </h1>
          </div>
        </div>

        <Sidebar.Root className='min-h-0 flex-1'>
          <Sidebar.Panel>
            <Sidebar.Header className='brutal-section-divider p-3'>
              <h2 className='brutal-kicker font-heading m-0 text-xs'>
                mdkk workspace
              </h2>
              <p className='brutal-chip-inverse brutal-label mt-1 inline-block px-1 py-0.5 text-[10px]'>
                Pages and shortcuts
              </p>
            </Sidebar.Header>

            <Sidebar.Content className='p-3'>
              <Sidebar.Group className='mb-3'>
                <Sidebar.GroupLabel className='brutal-kicker mb-2 text-[11px]'>
                  Workspace
                </Sidebar.GroupLabel>
                <Sidebar.GroupContent>
                  <Sidebar.Nav>
                    <Sidebar.List>
                      <Sidebar.Item>
                        <Sidebar.ItemButton
                          isActive
                          className='brutal-chip-inverse w-full px-2 py-1.5 text-left text-xs transition-colors'
                        >
                          Home
                        </Sidebar.ItemButton>
                      </Sidebar.Item>
                      <Sidebar.Item>
                        <Sidebar.ItemButton className={sidebarItemBaseClass}>
                          Search
                        </Sidebar.ItemButton>
                      </Sidebar.Item>
                    </Sidebar.List>
                  </Sidebar.Nav>
                </Sidebar.GroupContent>
              </Sidebar.Group>

              {demoGroupIds.map((groupId) => (
                <Sidebar.Group key={groupId} className='mb-3'>
                  <Sidebar.GroupLabel className='brutal-kicker mb-2 text-[11px]'>
                    Group {groupId}
                  </Sidebar.GroupLabel>
                  <Sidebar.GroupContent>
                    <Sidebar.Nav>
                      <Sidebar.List>
                        <Sidebar.Item>
                          <Sidebar.ItemButton className={sidebarItemBaseClass}>
                            Item {groupId}
                          </Sidebar.ItemButton>
                        </Sidebar.Item>
                      </Sidebar.List>
                    </Sidebar.Nav>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              ))}

              <Sidebar.Group className='mb-3'>
                <Sidebar.GroupLabel className='brutal-kicker mb-2 text-[11px]'>
                  Account
                </Sidebar.GroupLabel>
                <Sidebar.GroupContent>
                  <Sidebar.Nav>
                    <Sidebar.List>
                      <Sidebar.Item>
                        <Sidebar.ItemButton className={sidebarItemBaseClass}>
                          Settings
                        </Sidebar.ItemButton>
                      </Sidebar.Item>
                    </Sidebar.List>
                  </Sidebar.Nav>
                </Sidebar.GroupContent>
              </Sidebar.Group>
            </Sidebar.Content>

            <Sidebar.Footer className='brutal-footer-divider p-3'>
              <div className='brutal-chip brutal-label inline-block bg-brutal-emphasis px-1.5 py-0.5 text-[10px]'>
                Resizable sidebar sample
              </div>
            </Sidebar.Footer>
            <Sidebar.ResizeHandle />
          </Sidebar.Panel>

          <div className='flex-1 space-y-6 overflow-y-auto p-4 md:p-6'>
            <section className='space-y-2'>
              <h2 className={sectionHeadingClass}>Sidebar Compound API</h2>
              <div className='grid gap-3 md:grid-cols-2'>
                <Card tone='brutal' className='rotate-[-0.35deg]'>
                  <CardHeader className='p-3'>
                    <div className='flex items-center justify-between gap-2'>
                      <CardTitle className='brutal-heading text-sm'>
                        Sidebar Debug
                      </CardTitle>
                      <Badge variant='accent'>Live</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className='brutal-label space-y-2 bg-brutal-panel p-3 pt-3 text-xs'>
                    <div>Mode: Compound</div>
                    <div>State: Managed by Provider</div>
                  </CardContent>
                  <CardFooter className='p-3 pt-3'>
                    <Badge variant='outline'>Desktop + Mobile</Badge>
                  </CardFooter>
                </Card>

                <Card tone='brutal' className='rotate-[0.35deg]'>
                  <CardHeader className='p-3'>
                    <div className='flex items-center justify-between gap-2'>
                      <CardTitle className='brutal-heading text-sm'>
                        Sidebar Event Log
                      </CardTitle>
                      <Badge variant='secondary'>Queue</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className='brutal-label space-y-2 bg-brutal-panel p-3 pt-3 text-xs'>
                    <div>Toggle: Ready</div>
                    <div>Resize: Enabled</div>
                  </CardContent>
                  <CardFooter className='p-3 pt-3'>
                    <Badge variant='default'>No Errors</Badge>
                  </CardFooter>
                </Card>
              </div>
            </section>

            <TextField.Root className='border-brutal-strong border-brutal-ink bg-brutal-panel text-brutal-ink flex flex-col gap-2 p-3'>
              <TextField.Label className='brutal-label text-xs'>
                Feedback
              </TextField.Label>
              <div className='w-full'>
                <TextArea className='brutal-chip min-h-[92px] w-full p-2.5' />
                <TextField.Description>
                  Please provide as much detail as possible.
                </TextField.Description>
              </div>
            </TextField.Root>

            <section className='space-y-2'>
              <h2 className={sectionHeadingClass}>Single Story</h2>
              <div className='border-brutal-strong border-brutal-ink bg-brutal-panel text-brutal-ink w-[150px]'>
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

            <section className='space-y-2'>
              <h2 className={sectionHeadingClass}>Checkbox</h2>
              <div className='flex gap-2.5'>
                <Checkbox>Checkbox</Checkbox>
              </div>
            </section>
          </div>
        </Sidebar.Root>
      </div>
    </Layout>
  );
}

export default App;

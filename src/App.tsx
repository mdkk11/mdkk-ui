import { AspectRatio } from './components/AspectRatio';
import { Button } from './components/Button';
import { Checkbox } from './components/Checkbox/Checkbox';
import { Story, type StorySet } from './components/Story';

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
  return (
    <div className='p-8 space-y-8 min-h-screen bg-gray-50'>
      <h1 className='text-3xl font-bold'>mdkk-ui Dev Preview</h1>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Button</h2>
        <div className='flex gap-4'>
          <Button variant='primary'>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='outline'>Outline</Button>
        </div>
      </section>

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
  );
}

export default App;

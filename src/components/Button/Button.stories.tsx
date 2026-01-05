import type { Meta } from '@storybook/react';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onPress: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

export const Default = {
  args: {
    children: 'Button',
  },
};

export const AllVariants = {
  render: () => (
    <div className='flex flex-col gap-8 p-8'>
      {/* Variants */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Variants</h3>
        <div className='flex flex-wrap gap-4'>
          <Button variant='primary'>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='outline'>Outline</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Sizes</h3>
        <div className='flex flex-wrap items-center gap-4'>
          <Button size='sm'>Small</Button>
          <Button size='md'>Medium</Button>
          <Button size='lg'>Large</Button>
          <Button size='xl'>Extra Large</Button>
        </div>
      </section>

      {/* Shadows (Right Direction) */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Shadows - Right</h3>
        <div className='flex flex-wrap gap-6'>
          <Button variant='primary' shadow='right-sm'>
            Right SM
          </Button>
          <Button variant='primary' shadow='right-md'>
            Right MD
          </Button>
          <Button variant='primary' shadow='right-lg'>
            Right LG
          </Button>
        </div>
      </section>

      {/* Shadows (Left Direction) */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Shadows - Left</h3>
        <div className='flex flex-wrap gap-6'>
          <Button variant='primary' shadow='left-sm'>
            Left SM
          </Button>
          <Button variant='primary' shadow='left-md'>
            Left MD
          </Button>
          <Button variant='primary' shadow='left-lg'>
            Left LG
          </Button>
        </div>
      </section>

      {/* Shadows (Light - for dark backgrounds) */}
      <section className='bg-black p-6 rounded-lg'>
        <h3 className='text-lg font-bold mb-4 font-mono text-white'>
          Shadows - Light (Dark BG)
        </h3>
        <div className='flex flex-wrap gap-6'>
          <Button variant='primary' shadow='light-sm'>
            Light SM
          </Button>
          <Button variant='primary' shadow='light-md'>
            Light MD
          </Button>
          <Button variant='primary' shadow='light-lg'>
            Light LG
          </Button>
        </div>
      </section>

      {/* Interactive - Press */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>
          Interactive: Press ( active when pressed )
        </h3>
        <div className='flex flex-wrap gap-6'>
          <Button variant='primary' shadow='right-md' interactive='press'>
            Press MD
          </Button>
          <Button variant='primary' shadow='right-lg' interactive='press'>
            Press LG
          </Button>
        </div>
      </section>

      {/* Interactive - Hover */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>
          Interactive: Hover ( active when hovered )
        </h3>
        <div className='flex flex-wrap gap-6'>
          <Button variant='primary' shadow='right-md' interactive='hover'>
            Hover MD
          </Button>
          <Button variant='primary' shadow='right-lg' interactive='hover'>
            Hover LG
          </Button>
        </div>
      </section>

      {/* Full Width */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Full Width</h3>
        <div className='w-80'>
          <Button fullWidth>Full Width Button</Button>
        </div>
      </section>

      {/* Disabled State */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Disabled</h3>
        <div className='flex flex-wrap gap-4'>
          <Button disabled>Disabled Primary</Button>
          <Button variant='secondary' disabled>
            Disabled Secondary
          </Button>
        </div>
      </section>
      {/* Pending State */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Pending (Loading)</h3>
        <div className='flex flex-wrap gap-4'>
          <Button pending>Loading...</Button>
          <Button variant='secondary' pending>
            Loading Secondary
          </Button>
        </div>
      </section>
    </div>
  ),
};

export const WithShadowInteraction = {
  args: {
    children: 'Click me',
    variant: 'primary',
    shadow: 'right-lg',
    interactive: 'press',
    size: 'lg',
  },
};

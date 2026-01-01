import { Button } from './components/Button';

function App() {
  return (
    <div className='p-8 space-y-8 min-h-screen bg-background text-foreground font-sans'>
      <h1 className='text-4xl font-heading font-bold mb-8'>
        Design System POC
      </h1>

      <section className='space-y-4'>
        <h2 className='text-2xl font-heading font-semibold border-b border-border pb-2'>
          Button Variants
        </h2>
        <div className='flex flex-wrap gap-4'>
          <Button shadow='right-md'>Default</Button>
          <Button variant='secondary' shadow='right-md'>
            Secondary
          </Button>
          <Button variant='outline' shadow='right-md'>
            Outline
          </Button>
          <Button variant='ghost'>Ghost</Button>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-heading font-semibold border-b border-border pb-2'>
          Button Shadows
        </h2>
        <div className='flex flex-wrap gap-8'>
          <Button shadow='right-sm'>Right SM</Button>
          <Button shadow='right-md'>Right MD</Button>
          <Button shadow='right-lg'>Right LG</Button>
          <Button shadow='left-md'>Left MD</Button>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-heading font-semibold border-b border-border pb-2'>
          Interactions
        </h2>
        <div className='flex flex-wrap gap-8'>
          <Button shadow='right-md' interactive='press'>
            Press (Default)
          </Button>
          <Button shadow='right-md' interactive='hover'>
            Hover
          </Button>
          <Button shadow='right-md' interactive='none'>
            No Interaction
          </Button>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-heading font-semibold border-b border-border pb-2'>
          States
        </h2>
        <div className='flex flex-wrap gap-4'>
          <Button disabled shadow='right-md'>
            Disabled
          </Button>
          <Button variant='outline' disabled shadow='right-md'>
            Disabled Outline
          </Button>
        </div>
      </section>
    </div>
  );
}

export default App;

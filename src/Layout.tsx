import type { ReactNode } from 'react';
import { Sidebar } from './components/Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='mdkk-theme flex h-screen min-h-screen flex-col'>
      <AnyProvider>
        <Sidebar.Provider defaultWidth={280} minWidth={220}>
          {children}
        </Sidebar.Provider>
      </AnyProvider>
    </div>
  );
};

export const AnyProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

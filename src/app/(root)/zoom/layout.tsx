import { Metadata } from 'next';
import { ReactNode } from 'react';

import Navbar from '@/components/zoom/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import ClientProvider from './ClientProvider';
//import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'eSITE',
  description: 'A workspace for your team, powered by Stream Chat and Clerk.',
};

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <ClerkProvider>
      <ClientProvider>
        <main className="relative">
          <Navbar />
          <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
              <div className="w-full">{children}</div>
            </section>
        </main>
      </ClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;

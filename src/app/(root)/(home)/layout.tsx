import { ReactNode } from 'react';

import Navbar from '@/components/home/Navbar';
import Sidebar from '@/components/home/Sidebar';

const HomeLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="">
        <Sidebar />
        <section className="flex items-center justify-center md:mt-16">
          {children}
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;

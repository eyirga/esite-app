import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline } from 'react-icons/io5'
//import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 w-screen bg-dark-1 lg:px-0 ">
      <div className='flex justify-between py-4'>
        <Link href="/" className="flex items-center gap-2 ml-4">
          <Image
            src="/software.jpg"
            width={32}
            height={32}
            alt="yoom logo"
            className="rounded-full"
          />
          <p className="text-[26px] font-extrabold text-white max-sm:hidden">
            eSITESERVER
          </p>
        </Link>
        <div className="md:w-[50%] w-[180px] bg-gray-100 rounded-xl shadow px-3 py-[10px] flex items-center gap-2">
                <IoSearchOutline color={"#999"} />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-gray-100 outline-none text-[15px]"
                />
              </div>
        <div className="flex-between gap-5 mr-4">
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

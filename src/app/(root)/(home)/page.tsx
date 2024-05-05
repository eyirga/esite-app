"use client"
import Image from "next/image"
import CardList from '@/components/home/CardList'

const page = () => {

  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);


  return (
    <div className="xl:w-[80%] lg:w-[70%] w-[90%]">
      <div className="relative  text-slate-100 p-4 h-screen md:h-auto">
        <div className="flex items-center justify-center md:h-full h-screen">
          <img src="/washington.jpg" alt=""  className="brightness-[70%] rounded-xl md:h-auto h-[70%]" />
          <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center p-12 text-white text-ellipsis overflow-hidden ">
            <h1 className="text-lg md:text-4xl font-bold">eSITE Creative Thoughts.</h1>
            <p className="font-bold mt-8">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
              blanditiis adipisci minima reiciendis a autem assumenda dolore.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
              blanditiis adipisci minima reiciendis a autem assumenda dolore.
            </p>
            <h1 className="text-right text-md font-light md:font-bold mt-12">{time} - {date}</h1>
          </div>
        </div>
      </div>
      <div className=" text-slate-100">
        <CardList />
      </div>
      <div className="bg-slate-700 text-slate-100">Hero</div>
    </div>
  )
}

export default page
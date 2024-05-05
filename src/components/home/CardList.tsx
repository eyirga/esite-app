"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeCard from './HomeCard';

const CardList = () => {

  return (
    <section className='grid md:grid-cols-4 gap-4 p-2'>
      <HomeCard
        img="/icons/add-meeting.svg"
        title="Dashboard"
        description="Start an instant meeting"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Task"
        description="via invitation link"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Products"
        description="Plan your meeting"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="Food"
        description="Meeting Recordings"
      />
      <HomeCard
        img="/icons/add-meeting.svg"
        title="Booking"
        description="Start an instant meeting"
      />
      <HomeCard
        img="/icons/add-meeting.svg"
        title="Real Estate"
        description="Start an instant meeting"
      />
      <HomeCard
        img="/icons/add-meeting.svg"
        title="Zoom"
        description="Start an instant meeting"
      />
      <HomeCard
        img="/icons/add-meeting.svg"
        title="Blog"
        description="Start an instant meeting"
      />
    </section>
  )
}

export default CardList
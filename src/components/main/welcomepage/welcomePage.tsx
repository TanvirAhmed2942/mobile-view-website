
"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
function WelcomePage() {
  return (
  
      <div className='w-full min-h-[600px] xl:min-h-[650px] 2xl:min-h-[800px] flex flex-col items-center justify-between'>
    
     <div className='w-full h-full flex flex-col items-center justify-between 2xl:mt-4'>
     <div className="flex items-center justify-center gap-2 mb-6">
          <div className="relative w-40 h-10 flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="logo" 
              fill
              sizes="160px"
              priority
              className="object-contain scale-150"
            />
          </div>
        </div>

        <div className="w-full h-px bg-gray-300 "></div>
      </div>
        

       
        <div className='space-y-2'>
        <h2 className="text-2xl md:text-3xl font-bold text-paul text-center  leading-tight">
          Welcome to Ripple
          <br />
          Effect Giving
        </h2>

        <p className="text-base text-gray-600 text-center  leading-relaxed">
          Your single donation can inspire friends to
          <br />
          join, creating a growing wave of support for a
         
          cause you care about. See how one act of
          <br />
          kindness can ripple outwards.
        </p>
        </div>
       

        {/* Start Setup Button with gradient */}
        {/* <button className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200">
          Start Setup
        </button> */}
        <Button className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full transition-all duration-200">
          Start Setup
        </Button>


    </div>
  )
}

export default WelcomePage; 
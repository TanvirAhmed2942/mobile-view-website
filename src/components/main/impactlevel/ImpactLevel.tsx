"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DollarSign, Users, Heart } from "lucide-react";
import React from "react";
import { LuWaves } from "react-icons/lu";

function ImpactLevel() {
  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start pb-8">
        <NavBar />

        {/* Title */}
        <div className="w-full text-center px-4 pb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            You Are Making Waves...
          </h1>
        </div>

        {/* Impact Level Circle */}
        <div className="w-full flex justify-center pb-8">
          <div className="relative w-44 h-44 md:w-64 md:h-64 flex flex-col items-center justify-center ring-4  ring-offset-10 ring-offset-gray-100 ring-purple-200  rounded-full bg-white">
            {/* Wave Icon */}
            <div className="text-paul mb-4 ">
              <LuWaves size={50} />
            </div>

            {/* Impact Level Label */}
            <span className="text-sm text-gray-500 mb-1">Impact Level</span>

            {/* Level Number */}
            <span className="text-3xl  font-bold text-gray-800 mb-2">
              Level 5
            </span>

            {/* Level Name */}
            <span className="text-2xl md:text-3xl font-bold text-paul">
              Ocean Wave
            </span>
          </div>
        </div>

        {/* Funds Raised Card */}
        <div className="w-full ">
          <div className="w-full bg-paul rounded-xl p-6 md:p-8 flex flex-col items-center space-y-4">
            {/* Money Icon */}
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>

            {/* Funds Raised Label */}
            <span className="text-white text-lg font-medium">Funds Raised</span>

            {/* Amount */}
            <span className="text-5xl  font-bold text-white">$13,250</span>
          </div>
        </div>

        {/* Invited and Donated Cards */}
        <div className="w-full grid grid-cols-2 gap-4 ">
          {/* Invited Card */}
          <div className="bg-white rounded-xl p-6 flex flex-col items-center space-y-3">
            {/* People Icon */}
            <div className="w-12 h-12 rounded-full bg-[#f7f1fb] flex items-center justify-center">
              <Users className="w-6 h-6 text-paul" />
            </div>

            {/* Invited Label */}
            <span className="text-sm text-gray-500">Invited</span>

            {/* Count */}
            <span className="text-3xl  font-bold text-gray-800">1,256</span>
          </div>

          {/* Donated Card */}
          <div className="bg-white rounded-xl p-6 flex flex-col items-center space-y-3">
            {/* Heart Icon */}
            <div className="w-12 h-12 rounded-full bg-[#f7f1fb] flex items-center justify-center">
              <Heart className="w-6 h-6 text-paul" />
            </div>

            {/* Donated Label */}
            <span className="text-sm text-gray-500">Donated</span>

            {/* Count */}
            <span className="text-3xl  font-bold text-gray-800">134</span>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default ImpactLevel;

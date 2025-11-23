"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useIcon from "@/hooks/useIcon";
import { LuUserRoundPlus } from "react-icons/lu";
import { Heart } from "lucide-react";
import React from "react";

function Campaign() {
  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />

        {/* Header Section */}
        <div className="flex flex-col items-center gap-4">
          {/* Megaphone Icon with Teal Border */}
          <div className="h-20 w-20 rounded-full  bg-[#f5e6eb] flex items-center justify-center relative">
            {useIcon({ name: "mic_red_icon" })}
          </div>

          {/* Heading */}
          <div className="text-center flex flex-col items-center justify-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-700">
              Campaign Expired{" "}
            </h2>
            <p className="text-base text-gray-500">
              This campaign has officially ended. New donations and invites are
              now closed.
            </p>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="w-full space-y-3">
          {/* New Invitees Card */}
          <div className="w-full bg-white rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full  bg-[#f7f1fb] flex items-center justify-center">
                <LuUserRoundPlus className="w-5 h-5 text-paul" />
              </div>
              <span className="text-sm text-gray-700 font-medium">
                New Invitees
              </span>
            </div>
            <span className="text-xl font-bold text-gray-800">320</span>
          </div>

          {/* New Donors Card */}
          <div className="w-full bg-white rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full  bg-[#f7f1fb] flex items-center justify-center">
                <Heart className="w-5 h-5 text-paul fill-paul" />
              </div>
              <span className="text-sm text-gray-700 font-medium">
                New Donors
              </span>
            </div>
            <span className="text-xl font-bold text-gray-800">56</span>
          </div>

          {/* New Funds Card */}
          <div className="w-full bg-white rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full  bg-[#f7f1fb] flex items-center justify-center">
                {useIcon({ name: "bag_icon" })}
              </div>
              <span className="text-sm text-gray-700 font-medium">
                New Funds
              </span>
            </div>
            <span className="text-xl font-bold text-gray-800">$5,600</span>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-gray-300 my-4"></div>

        {/* Weekly Update Section */}
        <div className="w-full text-center space-y-2">
          <p className="text-xs text-gray-500">
            Thank you for being part of this cause.
          </p>
        </div>
      </div>
    </ScrollArea>
  );
}

export default Campaign;

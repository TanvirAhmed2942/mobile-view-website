"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import useIcon from "@/hooks/useIcon";
import React, { useState, useEffect } from "react";

function User() {
  const [hours, setHours] = useState(99);
  const [minutes, setMinutes] = useState(58);
  const [seconds, setSeconds] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        setMinutes((prevMin) => {
          if (prevMin > 0) return prevMin - 1;
          setHours((prevHour) => (prevHour > 0 ? prevHour - 1 : 0));
          return 59;
        });
        return 59;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-4">
          {/* Profile Picture with Edit Icon */}
          <div className="relative mb-3">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Paul Starkey"
              />
              <AvatarFallback className="text-xl">PS</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-paul rounded-lg flex items-center justify-center border-2 border-white">
              <Pencil className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Paul Starkey
          </h2>

          {/* Phone Number */}
          <p className="text-sm text-gray-500">+1-202-555-0142</p>
        </div>

        {/* Welcome Message */}
        <div className="w-full space-y-2">
          <p className="text-base text-gray-700">Hi Karl,</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            welcome back to{" "}
            <span className="font-semibold text-paul">PASS IT ALONG</span>, see
            the impact of the originator, add to your donation or friends invite
            below or continue to downline stats, thanks for being a loyal
          </p>
        </div>

        {/* Global Impact Dashboard */}
        <div className="w-full space-y-4 bg-white rounded-xl p-4">
          <h2 className="text-xl font-bold text-gray-800">
            Global Impact Dashboard
          </h2>

          {/* Personal Donation Cards */}
          <div className="space-y-3">
            <div className="w-full bg-paul rounded-xl p-4 flex items-center justify-between">
              <span className="text-white font-medium">
                Karl&apos;s Seed Donation
              </span>
              <span className="text-white text-xl font-bold">$100</span>
            </div>
            <div className="w-full bg-paul rounded-xl p-4 flex items-center justify-between">
              <span className="text-white font-medium">
                Karl&apos;s Downline Influence
              </span>
              <span className="text-white text-xl font-bold">$1,450</span>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-700 mb-2">Seeds Started</p>
              <p className="text-xl font-bold text-gray-800">1,234</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-700 mb-2">Total Invites</p>
              <p className="text-xl font-bold text-gray-800">145</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-700 mb-2">Total Doners</p>
              <p className="text-xl font-bold text-gray-800">1,234</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-700 mb-2">Overall Raised</p>
              <p className="text-xl font-bold text-gray-800">$15,545</p>
            </div>
          </div>
        </div>

        {/* Time Left to Help One Survivor */}
        <div className="w-full bg-purple-50 rounded-xl p-4">
          <p className="text-sm text-gray-700 mb-3 text-center">
            Time left to help one survivor:
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-red-600">
                {String(hours).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold text-red-600 uppercase mt-1">
                HOURS
              </span>
            </div>
            <span className="text-4xl font-bold text-red-600">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-red-600">
                {String(minutes).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold text-red-600 uppercase mt-1">
                MINS
              </span>
            </div>
            <span className="text-4xl font-bold text-red-600">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-red-600">
                {String(seconds).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold text-red-600 uppercase mt-1">
                SECS
              </span>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="w-full space-y-3 text-center">
          <a
            href="www.gopassit.org/friends"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3f7d94] underline text-sm block"
          >
            www.gopassit.org/friends
          </a>
          <p className="text-xs text-gray-500">
            If you did not donate or you have additional friends to invite click
            below.
          </p>
          <h3 className="text-lg font-bold text-gray-800">View Your Dowline</h3>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Button className="w-full h-11 bg-[#e9e3f1] hover:bg-purple-100 text-paul font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2">
            {useIcon({ name: "two_user_icon" })}
            Invite More Friends
          </Button>
          <Button className="w-full h-11 bg-paul hover:bg-paul-dark text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2">
            {useIcon({ name: "donate_icon" })}
            Donate Again
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

export default User;

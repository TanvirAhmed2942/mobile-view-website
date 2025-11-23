"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";

function Alerts() {
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

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Alerts
        </h1>

        <div className="w-full space-y-4">
          {/* First Card - Expiring Chain Countdown */}
          <div className="w-full bg-white rounded-2xl p-6">
            <p className="text-sm text-gray-700 mb-4 text-center">
              Your Pass It Along Chain Is expiring in
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

          {/* Second Card - Impact Summary */}
          <div className="w-full bg-white rounded-2xl p-6">
            <p className="text-sm text-gray-700 mb-4 text-center">
              Your Pass It Along Chain has expiring. In Just 100 Hours You made
              a big difference.
            </p>

            {/* Amount Raised */}
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-paul mb-1">$24,500</div>
              <div className="text-4xl font-bold text-paul">Raised!!</div>
            </div>

            {/* Statistics */}
            <div className="space-y-2 text-center">
              <p className="text-sm text-gray-700">12,765 Invitees</p>
              <p className="text-sm text-gray-700">245 Donors</p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default Alerts;

"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { useGetContentQuery } from "@/store/APIs/authApi/aboutusApi/aboutusApi";
import { ImageUrl } from "@/store/baseUrl";
function AboutUs() {
  const [isMissionExpanded, setIsMissionExpanded] = useState(false);
  const [isHowWeOperateExpanded, setIsHowWeOperateExpanded] = useState(false);
  const { data, isLoading, error } = useGetContentQuery();

  const foundersData = data?.data?.founders;
  const missionText =
    data?.data?.ourMission ||
    "Our mission content is not available at the moment.";
  const howWeOperateText =
    data?.data?.howWeOperate ||
    "How we operate content is not available at the moment.";

  const showError = !isLoading && error;

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start pb-8">
        <NavBar />

        {/* Page Title */}
        <div className="w-full text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            About Us
          </h1>
        </div>

        {/* Pass It Along Section */}
        <div className="w-full space-y-3 px-4">
          <h2 className="text-xl md:text-2xl font-semibold text-paul">
            Pass It Along: An Initiative for Connected Giving
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Pass It Along was created by philanthropists Paul & Jerri Starkey to
            help charities and connect friends in giving. It was first used by
            safehouse organizations supporting the anti-trafficking cause,
            setting the foundation for a new way to share and support meaningful
            work.
          </p>
        </div>

        {/* Our Founders Section */}
        <div className="w-full space-y-4 px-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Our Founders
          </h2>
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-paul">
              {foundersData?.[0]?.name}
            </h3>
            <p className="text-sm md:text-base text-gray-600 italic leading-relaxed">
              &quot;{foundersData?.[0]?.bio}&quot;
            </p>
            {/* Founders Photo */}
            <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={
                  foundersData?.[0]?.image
                    ? `${ImageUrl()}/${foundersData?.[0]?.image}`
                    : "https://via.placeholder.com/150"
                }
                alt={foundersData?.[0]?.name || ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
        </div>

        {/* Our Mission Section - Expandable */}
        <div className="w-full px-4">
          <button
            onClick={() => setIsMissionExpanded(!isMissionExpanded)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Our Mission
            </h2>
            {isMissionExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {isMissionExpanded && (
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              {isLoading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : showError ? (
                <p className="text-sm text-red-500">
                  Failed to load mission content.
                </p>
              ) : (
                <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                  {missionText}
                </p>
              )}
            </div>
          )}
        </div>

        {/* How We Operate Section - Expandable */}
        <div className="w-full px-4">
          <button
            onClick={() => setIsHowWeOperateExpanded(!isHowWeOperateExpanded)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              How We Operate
            </h2>
            {isHowWeOperateExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {isHowWeOperateExpanded && (
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              {isLoading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : showError ? (
                <p className="text-sm text-red-500">
                  Failed to load how we operate content.
                </p>
              ) : (
                <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                  {howWeOperateText}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Official & Secure Section */}
        <div className="w-full px-4">
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex-shrink-0">
              <ShieldCheck className="w-8 h-8 text-[#6db5d2]" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold text-[#6db5d2]">
                Official & Secure
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                It is important to track which chain/tree donors come from so
                grants can be made properly.
              </p>
            </div>
          </div>
        </div>

        {/* See Active Causes Button */}
        <div className="w-full px-4 mt-4">
          <Button className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full">
            See Active Causes
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

export default AboutUs;

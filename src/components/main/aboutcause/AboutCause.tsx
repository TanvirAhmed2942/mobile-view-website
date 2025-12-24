"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetContentQuery } from "@/store/APIs/authApi/aboutusApi/aboutusApi";
import { ImageUrl } from "@/store/baseUrl";

// Helper function to get full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "";
  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  // Otherwise, prepend the base URL
  return `${ImageUrl()}${
    imagePath.startsWith("/") ? imagePath : `/${imagePath}`
  }`;
};

function AboutCause() {
  const [isReadMoreExpanded, setIsReadMoreExpanded] = useState(false);
  const router = useRouter();
  const { data } = useGetContentQuery();
  const aboutRefugeForWomen = data?.data?.aboutRefugeForWomen || "";
  const citiesServed = data?.data?.citiesServed || 0;
  const yearsOfOperation = data?.data?.yearsOfOperation || 0;
  const survivorsSupported = data?.data?.survivorsSupported || 0;
  const media = data?.data?.gallery || [];

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start pb-8">
        <NavBar />

        {/* Page Title and Subtitle */}
        <div className="w-full text-center space-y-2 px-4">
          <h1 className="text-3xl md:text-3xl font-bold text-gray-800">
            About the Cause
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Learn more about the mission behind this campaign
          </p>
        </div>

        {/* Information Card */}
        <div className="w-full px-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-4">
            {/* Organization Name */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Organization Name:</span>
              <span className="text-sm font-medium text-gray-800">
                Refuge For Woman
              </span>
            </div>

            {/* Established */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Established:</span>
              <span className="text-sm font-medium text-gray-800">2010</span>
            </div>

            {/* Network */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Network:</span>
              <span className="text-sm font-medium text-gray-800">
                5 City Network
              </span>
            </div>

            {/* Mission Summary */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-600 block">
                Mission Summary:
              </span>
              <p className="text-sm text-gray-800 leading-relaxed">
                A safe-housing network providing emergency care and long-term
                support for survivors of sex trafficking.
              </p>
            </div>
          </div>
        </div>

        {/* About Refuge For Women Section */}
        <div className="w-full space-y-3 px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-left">
            About Refuge For Women
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            {aboutRefugeForWomen.length > 120 ? (
              <>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {isReadMoreExpanded
                    ? aboutRefugeForWomen
                    : `${aboutRefugeForWomen.substring(0, 120)}...`}
                </p>
                <button
                  onClick={() => setIsReadMoreExpanded(!isReadMoreExpanded)}
                  className="text-paul underline text-sm mt-2 hover:text-paul-dark"
                >
                  {isReadMoreExpanded ? "Read Less" : "Read More"}
                </button>
              </>
            ) : (
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {aboutRefugeForWomen}
              </p>
            )}
          </div>
        </div>

        {/* Impact Highlights Section */}
        <div className="w-full space-y-3 px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-left">
            Impact Highlights
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Cities Served */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#f7f1fb] flex items-center justify-center">
                <Users className="w-6 h-6 text-paul" />
              </div>
              <span className="text-xs text-gray-500">Cities Served</span>
              <span className="text-xl font-bold text-gray-800">
                {citiesServed}
              </span>
            </div>

            {/* Years of Operation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#f7f1fb] flex items-center justify-center">
                <Users className="w-6 h-6 text-paul" />
              </div>
              <span className="text-xs text-gray-500">Years of Operation</span>
              <span className="text-xl font-bold text-gray-800">
                {yearsOfOperation}
              </span>
            </div>

            {/* Survivors Supported */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#f7f1fb] flex items-center justify-center">
                <Users className="w-6 h-6 text-paul" />
              </div>
              <span className="text-xs text-gray-500">Survivors Supported</span>
              <span className="text-xl font-bold text-gray-800">
                {survivorsSupported}
              </span>
            </div>

            {/* Emergency & Long-term Care */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#f7f1fb] flex items-center justify-center">
                <Users className="w-6 h-6 text-paul" />
              </div>
              <span className="text-xs text-gray-500">
                Emergency & Long-term Care
              </span>
            </div>
          </div>
        </div>

        {/* Media Section */}
        {media.length > 0 && (
          <div className="w-full space-y-3 px-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-left">
              Media
            </h2>
            <div className="space-y-3">
              {/* Large Top Image - First image */}
              {media[0] && (
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
                  <Image
                    src={getImageUrl(media[0])}
                    alt="Refuge For Women - Media 1"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              )}

              {/* Bottom Images Grid - Remaining images */}
              {media.length > 1 && (
                <div
                  className={`grid gap-3 ${
                    media.length === 2
                      ? "grid-cols-2"
                      : media.length === 3
                      ? "grid-cols-2"
                      : "grid-cols-2"
                  }`}
                >
                  {media.slice(1).map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative w-full aspect-square rounded-lg overflow-hidden"
                    >
                      <Image
                        src={getImageUrl(imageUrl)}
                        alt={`Refuge For Women - Media ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 400px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Donate Now Button */}
        <div className="w-full px-4 mt-4">
          <Button
            className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full"
            onClick={() => router.push("/donate")}
          >
            Donate Now
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

export default AboutCause;

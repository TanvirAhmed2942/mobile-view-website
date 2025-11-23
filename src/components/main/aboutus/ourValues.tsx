"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurValues({
  headline,
  values,
}: {
  headline: string;
  values: {
    title: string;
    description: string;
    src: string;
  }[];
}) {
  return (
    <>
      <div className="  px-4 md:px-0 py-6 md:py-16">
        <div className="container mx-auto ">
          <h1 className="text-4xl font-bold text-center text-black pb-6 md:pb-16">
            {headline}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {values.map((value, idx) => (
              <div key={idx} className="h-full">
                <Card className="p-2  border-none shadow-lg h-full relative overflow-hidden">
                  <div
                    className="absolute inset-0 blur-xs"
                    style={{
                      backgroundImage: `url(${value.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <CardContent className="relative z-10 flex flex-col items-center md:items-start justify-center p-8 text-center md:text-left">
                    <h2 className="text-2xl  font-bold text-white mb-2 text-center md:text-left">
                      {value.title}
                    </h2>
                    <p className="text-white text-sm md:text-base text-center md:text-left">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
// bg-peter

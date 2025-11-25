"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function WelcomePage() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleStartSetup = () => {
    router.push("/auth/registration");
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setShowContent(true);
  };

  useGSAP(() => {
    if (showContent) {
      // Set initial states
      gsap.set(
        [
          logoRef.current,
          separatorRef.current,
          titleRef.current,
          descriptionRef.current,
          buttonRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      // Create timeline for sequential animations
      const tl = gsap.timeline();

      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          separatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }
  }, [showContent]);

  return (
    <div className="w-full min-h-[600px] xl:min-h-[650px] 2xl:min-h-[800px] flex flex-col items-center justify-between relative">
      {/* Video Container - Smaller, centered */}
      {!videoEnded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-2xl ">
          {/* <div className="w-full h-full  rounded-2xl overflow-hidden bg-transparent shadow-lg"> */}
          <video
            ref={videoRef}
            className="w-full h-full object-center border border-transparent"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
          >
            <source src="/launch.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* </div> */}
        </div>
      )}

      {/* Content Container - Only show after video ends */}
      {showContent && (
        <>
          <div className="w-full h-full flex flex-col items-center justify-between 2xl:mt-4">
            <div
              ref={logoRef}
              className="flex items-center justify-center gap-2 mb-6"
            >
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

            <div ref={separatorRef} className="w-full h-px bg-gray-300"></div>
          </div>

          <div ref={titleRef} className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-paul text-center leading-tight">
              Welcome to Ripple
              <br />
              Effect Giving
            </h2>
            <div ref={descriptionRef}>
              <p className="text-base text-gray-600 text-center leading-relaxed">
                Your single donation can inspire friends to
                <br />
                join, creating a growing wave of support for a cause you care
                about. See how one act of
                <br />
                kindness can ripple outwards.
              </p>
            </div>
          </div>

          <Button
            ref={buttonRef}
            onClick={handleStartSetup}
            className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full transition-all duration-200"
          >
            Start Setup
          </Button>
        </>
      )}
    </div>
  );
}

export default WelcomePage;

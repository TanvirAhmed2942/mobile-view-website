"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye } from "lucide-react";

function WelcomePage() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [nickName, setNickName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSendVerificationCode = () => {
    router.push("/auth/phone-verification");
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setShowContent(true);
  };

  useGSAP(() => {
    if (showContent) {
      // Set initial states for all elements
      gsap.set(
        [
          logoRef.current,
          separatorRef.current,
          titleRef.current,
          descriptionRef.current,
          formRef.current,
          buttonRef.current,
          footerRef.current,
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
          formRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
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
        )
        .to(
          footerRef.current,
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

          <form ref={formRef} className="space-y-5 w-full mt-6">
            {/* Nick Name Input */}
            <div className="space-y-2">
              <Label
                htmlFor="nickName"
                className="text-gray-700 font-medium text-sm"
              >
                Nick Name:
              </Label>
              <Input
                id="nickName"
                type="text"
                placeholder="Enter your nick name here..."
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                className="w-full bg-white border-none shadow-none rounded-lg pr-10 h-11"
              />
            </div>

            {/* Phone Number Input */}
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-gray-700 font-medium text-sm"
              >
                Phone Number:
              </Label>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  type={showPhoneNumber ? "text" : "tel"}
                  placeholder="Must contain at least 6 characters"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-white border-none shadow-none rounded-lg pr-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPhoneNumber(!showPhoneNumber)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none focus:text-gray-700 transition-colors"
                  aria-label={
                    showPhoneNumber ? "Hide phone number" : "Show phone number"
                  }
                >
                  {showPhoneNumber ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </form>

          <div ref={buttonRef} className="space-y-2 w-full">
            <Button
              type="button"
              onClick={handleSendVerificationCode}
              className="w-full bg-paul hover:bg-paul-dark text-white font-medium py-6 px-4 rounded-full "
            >
              Send Verification Code
            </Button>
            <p
              ref={footerRef}
              className="text-xs text-gray-500 leading-relaxed text-center"
            >
              Your phone number is your username.
              <br />
              No password needed.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default WelcomePage;

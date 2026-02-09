"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/store/APIs/authApi/authApi";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
function WelcomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaign");
  console.log(campaignId);
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
  const [nickName, setNickName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [login, { isLoading }] = useLoginMutation();
  const [terms, setTerms] = useState(false);
  // Store campaignId in localStorage as soon as the page loads
  useEffect(() => {
    const extractAndStoreCampaignId = () => {
      if (typeof window !== "undefined") {
        // Get campaignId from URL directly - multiple methods for reliability
        const searchParams = window.location.search;
        const urlParams = new URLSearchParams(searchParams);
        let urlCampaignId = urlParams.get("campaign");

        // Fallback: try parsing the URL directly if URLSearchParams doesn't work
        if (!urlCampaignId && searchParams) {
          const match = searchParams.match(/[?&]campaign=([^&]*)/);
          if (match && match[1]) {
            urlCampaignId = decodeURIComponent(match[1]);
          }
        }

        // Use URL campaign ID first, then fallback to useSearchParams
        const finalCampaignId = urlCampaignId || campaignId;

        // Extract parent phone from URL
        let urlParentPhone = urlParams.get("parent");

        // Fallback: try parsing the URL directly if URLSearchParams doesn't work
        if (!urlParentPhone && searchParams) {
          const match = searchParams.match(/[?&]parent=([^&]*)/);
          if (match && match[1]) {
            urlParentPhone = decodeURIComponent(match[1]);
          }
        }

        if (finalCampaignId) {
          localStorage.setItem("params_campaign_id", finalCampaignId);

          // Store parent phone from URL if present
          if (urlParentPhone) {
            localStorage.setItem("parentPhoneFromUrl", urlParentPhone);
          }

          return true;
        } else {
          console.log("No campaign ID found in URL");
        }

        // Even if no campaign ID, store parent phone if present
        if (urlParentPhone) {
          localStorage.setItem("parentPhoneFromUrl", urlParentPhone);
        }
      }
      return false;
    };

    // Try immediately
    if (!extractAndStoreCampaignId()) {
      // If not found, try again on window load (in case of timing issues)
      const handleLoad = () => {
        extractAndStoreCampaignId();
        window.removeEventListener("load", handleLoad);
      };
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [campaignId]); // Include campaignId in dependencies

  const handleSendVerificationCode = async () => {
    // Validate inputs
    if (!nickName.trim()) {
      toast.error("Please enter your nick name");
      return;
    }

    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      const response = await login({
        role: "USER", // Hardcoded as requested
        name: nickName.trim(),
        contact: phoneNumber.trim(),
      }).unwrap();

      // Extract oneTimeCode from response: data.authentication.oneTimeCode
      // Note: API returns data as object, not array
      const responseData = response?.data as unknown as {
        authentication?: { oneTimeCode?: number };
        role?: string;
      };
      const oneTimeCode = responseData?.authentication?.oneTimeCode;

      console.log("✅ Login successful. OneTimeCode:", oneTimeCode);

      // Save phone number, nickName, and oneTimeCode to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("phoneNumber", phoneNumber.trim());
        localStorage.setItem("nickName", nickName.trim());

        // Save oneTimeCode for auto-fill
        if (oneTimeCode) {
          localStorage.setItem("oneTimeCode", String(oneTimeCode));
          console.log("✅ OneTimeCode stored in localStorage:", oneTimeCode);
        } else {
          console.error("❌ OneTimeCode not found in response");
        }

        // Save user role from response if available
        if (responseData?.role) {
          localStorage.setItem("userRole", responseData.role);
        }
      }

      toast.success("Verification code sent successfully!");
      router.push("/auth/phone-verification");
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string }; message?: string })?.data
          ?.message ||
        (error as { message?: string })?.message ||
        "Failed to send verification code. Please try again.";
      toast.error(errorMessage);
    }
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
              Welcome to
              <br />
              PASS IT ALONG
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

          <form ref={formRef} className="space-y-5 w-full mt-4 bg">
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

              <div className="phone-input-wrapper">
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value || "")}
                  placeholder="Enter your phone number"
                  className="phone-input-custom"
                />
              </div>
            </div>
            <div className="space-y-2 flex items-start  gap-2">
              <Checkbox
                id="terms"
                className="w-4 h-4 mt-1 border-[#8d4585]"
                checked={terms}
                onCheckedChange={(checked) => setTerms(checked === true)}
              />
              <Label htmlFor="terms" className="text-gray-700 font-medium text-sm text-justify" >
                By entering your phone number, you agree to receive a one-time SMS
                passcode from Pass It Along to verify your identity and access your account.
                This message is sent only for authentication purposes.
                Message & data rates may apply.
              </Label>
            </div>
            <div className="text-xs text-gray-500 leading-relaxed text-center">
              Reply <span className="text-paul font-bold cursor-pointer" onClick={() => router.push("/stop")}>STOP</span> to opt out. Reply <span className="text-paul font-bold cursor-pointer" onClick={() => router.push("/help")}>HELP</span> for help.
            </div>
            <div className="text-xs text-gray-500 leading-relaxed text-center">
              Read our <Link href="/privacy-policy" className="text-paul">Privacy Policy</Link> here.
            </div>
          </form>

          <div ref={buttonRef} className="space-y-2 w-full">
            <Button
              type="button"
              onClick={handleSendVerificationCode}
              disabled={isLoading || !terms}
              className="w-full bg-paul hover:bg-paul-dark text-white font-medium py-6 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
            </Button>
            <p
              ref={footerRef}
              className="text-xs text-gray-500 leading-relaxed text-center"
            >
              Pass It Along is operated by <Link href="https://www.fencoinvest.com/" target="_blank" className="text-paul">Fenco Investments</Link>.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default WelcomePage;

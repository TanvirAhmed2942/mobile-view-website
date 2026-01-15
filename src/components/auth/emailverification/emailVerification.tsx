"use client";

import React, { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useVerifyOTPMutation,
  useLoginMutation,
} from "@/store/APIs/authApi/authApi";
import { toast } from "sonner";
import Timer from "./Timer";

function PhoneVerification() {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();
  const [login, { isLoading: isResending }] = useLoginMutation();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");

  // Get phone number and nickName from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPhone = localStorage.getItem("phoneNumber");
      const storedNickName = localStorage.getItem("nickName");

      if (storedPhone) {
        setPhoneNumber(storedPhone);
      }
      if (storedNickName) {
        setNickName(storedNickName);
      }
    }
  }, []);

  // Auto-fill OTP code from localStorage after component mounts
  useEffect(() => {
    const autoFillOTP = () => {
      if (typeof window !== "undefined") {
        const storedOneTimeCode = localStorage.getItem("oneTimeCode");

        if (storedOneTimeCode) {
          const codeNum = parseInt(storedOneTimeCode, 10);

          if (!isNaN(codeNum) && codeNum > 0) {
            // Convert number to 4-digit string array
            const codeString = codeNum.toString().padStart(4, "0");
            const codeArray = codeString.split("").slice(0, 4);

            // Ensure we have exactly 4 digits
            while (codeArray.length < 4) {
              codeArray.push("0");
            }

            console.log("✅ Auto-filled OTP:", codeString);

            // Set the code state
            setCode(codeArray);

            // Focus the last input field
            setTimeout(() => {
              inputRefs.current[3]?.focus();
            }, 200);
          }
        }
      }
    };

    // Try immediately
    autoFillOTP();

    // Also try after a short delay in case of timing issues
    const timer = setTimeout(autoFillOTP, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleVerify = async () => {
    // Check if phone number exists
    if (!phoneNumber) {
      toast.error("Phone number not found. Please go back and try again.");
      return;
    }

    // Combine OTP code
    const oneTimeCode = parseInt(code.join(""), 10);

    // Validate OTP
    if (isNaN(oneTimeCode) || code.some((digit) => !digit)) {
      toast.error("Please enter a valid 4-digit OTP code");
      return;
    }

    try {
      const response = await verifyOTP({
        oneTimeCode,
        contact: phoneNumber,
        isForLogin: true, // Hardcoded as requested
      }).unwrap();

      // Save accessToken, user role, and campaignId to localStorage
      if (typeof window !== "undefined" && response.data) {
        const data = response.data;
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);

          // Extract role from JWT token
          try {
            const tokenParts = data.accessToken.split(".");
            if (tokenParts.length === 3) {
              const payload = JSON.parse(atob(tokenParts[1]));
              if (payload.role) {
                localStorage.setItem("userRole", payload.role);
              }
            }
          } catch (error) {
            console.error("Failed to extract role from JWT token:", error);
          }
        }
        // Save campaignId if available (for SUPER_ADMIN)
        if (data.campaignId) {
          localStorage.setItem("last_campaign_id", data.campaignId);
        }
      }

      // Clear persisted login data after successful OTP verification
      if (typeof window !== "undefined") {
        localStorage.removeItem("phoneNumber");
        localStorage.removeItem("nickName");
        localStorage.removeItem("oneTimeCode");
      }

      toast.success("OTP verified successfully!");

      // Redirect based on totalLogin: > 1 → /user, <= 1 → /donate
      if (response.data) {
        const totalLogin = response.data.totalLogin ?? 0;
        if (totalLogin > 1) {
          router.push("/donate");
        } else {
          router.push("/donate");
        }
      } else {
        // Default to /donate if no data
        router.push("/donate");
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string }; message?: string })?.data
          ?.message ||
        (error as { message?: string })?.message ||
        "Failed to verify OTP. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    const newCode = [...code];
    for (let i = 0; i < pastedData.length && i < 4; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex(
      (digit, index) => index >= pastedData.length && !digit
    );
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 3;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResendCode = async () => {
    // Check if we have the required data
    if (!phoneNumber || !nickName) {
      toast.error("Missing login information. Please go back and try again.");
      return;
    }

    try {
      // Call login API again with the same data
      await login({
        role: "USER", // Hardcoded as requested
        name: nickName,
        contact: phoneNumber,
      }).unwrap();

      toast.success("Verification code resent successfully!");

      // Clear OTP fields
      setCode(["", "", "", ""]);
      // Focus first input
      inputRefs.current[0]?.focus();
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string }; message?: string })?.data
          ?.message ||
        (error as { message?: string })?.message ||
        "Failed to resend verification code. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center justify-start">
      {/* Logo and App Name */}
      <div className="w-full h-full flex flex-col items-center justify-between 2xl:mt-4">
        <div className="flex items-center justify-center gap-2 mb-6 ">
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

        <div className="w-full h-px bg-gray-300 "></div>
      </div>

      <div className="space-y-2 text-left mt-6">
        <h2 className="text-2xl  font-semibold text-gray-800 mb-2">
          Enter OTP
        </h2>

        <p className="text-sm  text-gray-500 ">
          Enter OTP sent to{" "}
          {phoneNumber
            ? phoneNumber.replace(/(.{3})(.{3})(.*)/, "$1$2XXX")
            : "your phone"}{" "}
          to complete your verification. Don&apos;t share this code with anyone.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5 w-full mt-6">
        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3">
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-14 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-paul focus:ring-2 focus:ring-paul/20"
            />
          ))}
        </div>

        {/* Resend Timer or Resend Code Link */}
        <Timer
          initialSeconds={30}
          onResend={handleResendCode}
          isResending={isResending}
        />

        <Button
          type="button"
          onClick={handleVerify}
          disabled={isVerifying || !phoneNumber}
          className="w-full bg-paul hover:bg-paul-dark text-white font-medium py-6 px-4 rounded-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? "Verifying..." : "Verify Me"}
        </Button>
      </form>
    </div>
  );
}

export default PhoneVerification;

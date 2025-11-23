"use client";

import React, { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { useRouter } from "next/navigation";

function PhoneVerification() {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(30);
  const router = useRouter();
  const handleVerify = () => {
    router.push("/invite");
  };
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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

  const handleResendCode = () => {
    // Reset timer to 30 seconds
    setTimer(30);
    // Clear OTP fields
    setCode(["", "", "", ""]);
    // Focus first input
    inputRefs.current[0]?.focus();
    // TODO: Add API call to resend OTP here
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
          Enter OTP Send sms 01721XXX to complete your verification. Don&apos;t
          share this code with anyone.
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
        <div className="text-center">
          {timer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend code in {String(Math.floor(timer / 60)).padStart(2, "0")}:
              {String(timer % 60).padStart(2, "0")}
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendCode}
              className="text-sm text-paul hover:text-paul-dark hover:underline cursor-pointer font-medium"
            >
              Resend Code
            </button>
          )}
        </div>

        <Button
          type="button"
          onClick={handleVerify}
          className="w-full bg-paul hover:bg-paul-dark text-white font-medium py-6 px-4 rounded-full mt-6"
        >
          Verify Me
        </Button>
      </form>
    </div>
  );
}

export default PhoneVerification;

"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/APIs/authApi/authApi";
import { toast } from "sonner";

function Login() {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [nickName, setNickName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const handleSendVerificationCode = async () => {
    // Validate inputs
    if (!nickName.trim()) {
      toast.error("Please enter your nick name");
      return;
    }

    if (!phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    try {
      const response = await login({
        role: "USER",
        name: nickName.trim(),
        contact: phoneNumber.trim(),
      }).unwrap();

      // Extract oneTimeCode from response: data.authentication.oneTimeCode
      // Note: API returns data as object, not array (TypeScript type is incorrect)
      const responseData = response?.data as unknown as {
        authentication?: { oneTimeCode?: number };
      };
      const oneTimeCode = responseData?.authentication?.oneTimeCode;

      console.log("✅ Login successful. OneTimeCode:", response);

      // Save to localStorage
      localStorage.setItem("phoneNumber", phoneNumber.trim());
      localStorage.setItem("nickName", nickName.trim());

      if (oneTimeCode) {
        localStorage.setItem("oneTimeCode", String(oneTimeCode));
        console.log("✅ OneTimeCode stored in localStorage:", oneTimeCode);
      } else {
        console.error("❌ OneTimeCode not found in response");
      }

      toast.success("Verification code sent successfully!");

      // Redirect to OTP verification page
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
  return (
    <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center justify-between">
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

      <div className="space-y-2 text-center">
        <h2 className="text-2xl  font-semibold text-gray-800 mb-2">
          Welcome to Friends Giving
        </h2>

        <p className="text-sm  text-gray-500 ">
          Your Cell Number is your username verify it&apos;s you
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5 w-full mt-6">
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPhoneNumber ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            type="button"
            onClick={handleSendVerificationCode}
            disabled={isLoading}
            className="w-full bg-paul hover:bg-paul-dark text-white font-medium py-6 px-4 rounded-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Verification Code"}
          </Button>{" "}
          {/* Footer Text */}
          <div className="text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              Your phone number is your username.
              <br />
              No password needed.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

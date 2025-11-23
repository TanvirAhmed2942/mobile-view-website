"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function ForgotPassword() {
  return (
    <div className="w-full bg-white rounded-lg p-8">
      {/* Logo and Header */}
      <div className="text-center mb-8">
        <Image
          src="/nav/Logo.png"
          alt="logo"
          width={300}
          height={300}
          className="w-48 h-14 object-cover mx-auto my-4"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Reset Password
        </h2>
        <p className="text-gray-600 text-sm">
          Enter your registered email to receive an OTP.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-7">
        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-800 font-bold text-md">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address here..."
            className="w-full"
          />
        </div>

        {/* Send OTP Button */}
        <div className="flex justify-start">
          <Button
            type="submit"
            className="bg-peter hover:bg-peter-dark text-white font-medium py-2 px-6 rounded-lg"
          >
            Send OTP
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;

"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import PasswordModal from "./passWordModal";

export default function PasswordAnd2FA() {
  const [password, setPassword] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="w-full mx-auto space-y-4 sm:space-y-6  sm:px-0">
      {/* Password Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Password
            </h2>
            <Input
              type="password"
              placeholder="Enter your password here..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full max-w-md"
            />
          </div>
          <Button
            className="bg-peter hover:bg-peter-dark text-white px-6 cursor-pointer w-full md:w-auto mt-4 md:mt-0"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            Change password
          </Button>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Security</h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-1">
              Two-Factor Authentication (2FA)
            </h3>
            <p className="text-sm text-gray-500">
              Enable 2FA for enhanced security
            </p>
          </div>
          <Switch
            checked={is2FAEnabled}
            onCheckedChange={setIs2FAEnabled}
            className="cursor-pointer self-start sm:self-center"
          />
        </div>
      </div>

      {/* Password Modal */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        is2FAEnabled={is2FAEnabled}
        onPasswordChange={(newPassword) => {
          setPassword(newPassword);
          // Here you would typically call an API to update the password
          console.log("Password changed to:", newPassword);
        }}
      />
    </div>
  );
}

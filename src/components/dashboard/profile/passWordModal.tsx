"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  is2FAEnabled: boolean;
  onPasswordChange: (newPassword: string) => void;
}

function PasswordModal({
  isOpen,
  onClose,
  is2FAEnabled,
  onPasswordChange,
}: PasswordModalProps) {
  // State for 2FA enabled flow
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword2FA, setNewPassword2FA] = useState("");
  const [confirmPassword2FA, setConfirmPassword2FA] = useState("");

  // State for 2FA disabled flow
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error states
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setOtp("");
      setIsOtpVerified(false);
      setNewPassword2FA("");
      setConfirmPassword2FA("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOtpError("");
      setPasswordError("");
      setPasswordMatchError("");
    }
  }, [isOpen]);

  // Handle OTP verification (mock implementation)
  const handleOtpVerification = () => {
    // Mock OTP verification - in real app, this would call an API
    if (otp.length === 4 && otp === "1234") {
      setIsOtpVerified(true);
      setOtpError("");
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  // Handle password change for 2FA enabled
  const handlePasswordChange2FA = () => {
    if (newPassword2FA !== confirmPassword2FA) {
      setPasswordMatchError("Passwords do not match");
      return;
    }
    if (newPassword2FA.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    onPasswordChange(newPassword2FA);
    onClose();
  };

  // Handle password change for 2FA disabled
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    if (!currentPassword) {
      setPasswordError("Please enter your current password");
      return;
    }

    onPasswordChange(newPassword);
    onClose();
  };

  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOtp(value);
    setOtpError("");
  };

  const handleResendOtp = () => {
    console.log("Resend OTP");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            {is2FAEnabled
              ? "Enter your 2FA code to proceed with password change"
              : "Enter your current password and new password"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {is2FAEnabled ? (
            // 2FA Enabled Flow
            <>
              {!isOtpVerified ? (
                // OTP Input Step
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Enter 4-digit OTP
                      </label>
                      <p
                        className="text-sm text-gray-500 mb-2 cursor-pointer hover:text-[#8d4585]"
                        onClick={handleResendOtp}
                      >
                        Resend OTP
                      </p>
                    </div>
                    <Input
                      type="text"
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="0000"
                      className="text-center text-2xl tracking-widest"
                      maxLength={4}
                    />
                    {otpError && (
                      <p className="text-red-500 text-sm mt-1">{otpError}</p>
                    )}
                  </div>
                  <Button
                    onClick={handleOtpVerification}
                    disabled={otp.length !== 4}
                    className="w-full bg-peter hover:bg-peter-dark text-white"
                  >
                    Verify OTP
                  </Button>
                </div>
              ) : (
                // New Password Step
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      New Password
                    </label>
                    <Input
                      type="password"
                      value={newPassword2FA}
                      onChange={(e) => setNewPassword2FA(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Confirm New Password
                    </label>
                    <Input
                      type="password"
                      value={confirmPassword2FA}
                      onChange={(e) => setConfirmPassword2FA(e.target.value)}
                      placeholder="Confirm new password"
                    />
                    {passwordMatchError && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordMatchError}
                      </p>
                    )}
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordError}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            // 2FA Disabled Flow
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Current Password
                </label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  New Password
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                {passwordMatchError && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordMatchError}
                  </p>
                )}
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:flex-1"
          >
            Cancel
          </Button>
          {is2FAEnabled ? (
            isOtpVerified && (
              <Button
                onClick={handlePasswordChange2FA}
                className="w-full sm:flex-1 bg-peter hover:bg-peter-dark text-white"
              >
                Save Password
              </Button>
            )
          ) : (
            <Button
              onClick={handlePasswordChange}
              className="w-full sm:flex-1 bg-peter hover:bg-peter-dark text-white"
            >
              Save Password
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PasswordModal;

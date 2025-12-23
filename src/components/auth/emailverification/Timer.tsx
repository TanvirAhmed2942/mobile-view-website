"use client";

import React, { useState, useEffect, useRef } from "react";

interface TimerProps {
  initialSeconds?: number;
  onTimerEnd?: () => void;
  onResend?: () => void | Promise<void>;
  isResending?: boolean;
}

function Timer({
  initialSeconds = 30,
  onTimerEnd,
  onResend,
  isResending = false,
}: TimerProps) {
  const [timer, setTimer] = useState(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start the timer
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Clear interval when timer reaches 0
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          onTimerEnd?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [initialSeconds, onTimerEnd]);

  const handleResend = async () => {
    // Don't allow resend if already resending
    if (isResending) return;

    try {
      // Call onResend callback first (it will handle the API call)
      await onResend?.();

      // Only reset timer if resend was successful (no error thrown)
      // Clear existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Reset timer
      setTimer(initialSeconds);

      // Restart the timer
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            // Clear interval when timer reaches 0
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            onTimerEnd?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      // If resend fails, don't reset the timer
      // Error is already handled in the parent component
    }
  };

  return (
    <div className="text-center">
      {timer > 0 ? (
        <p className="text-sm text-gray-500">
          Resend code in {String(Math.floor(timer / 60)).padStart(2, "0")}:
          {String(timer % 60).padStart(2, "0")}
        </p>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-sm text-paul hover:text-paul-dark hover:underline cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending ? "Resending..." : "Resend Code"}
        </button>
      )}
    </div>
  );
}

export default Timer;

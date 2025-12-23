"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  login?: boolean; // If true, requires user to be logged in
  role?: string[]; // Array of allowed roles (e.g., ['USER', 'ADMIN'])
  redirectTo?: string; // Where to redirect if not authorized (default: "/")
}

interface JWTPayload {
  id?: string;
  role?: string;
  contact?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

// Helper function to decode JWT token
function decodeJWT(token: string): JWTPayload | null {
  try {
    // JWT has 3 parts: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];

    // Base64URL decode
    // Replace URL-safe characters and add padding if needed
    let base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padding = base64.length % 4;
    if (padding) {
      base64 += "=".repeat(4 - padding);
    }

    // Decode and parse JSON
    const decoded = atob(base64);
    return JSON.parse(decoded) as JWTPayload;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

function AuthGuard({
  children,
  login = false,
  role = [],
  redirectTo,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === "undefined") {
        setIsLoading(false);
        return;
      }

      const accessToken = localStorage.getItem("accessToken");

      // Determine redirect destination
      const defaultRedirect = login ? "/" : "/your-why"; // If login required, go to home, else go to your-why
      const redirectPath = redirectTo || defaultRedirect;

      // Decode JWT to get role
      let userRole: string | null = null;
      if (accessToken) {
        const decoded = decodeJWT(accessToken);
        if (decoded && decoded.role) {
          userRole = decoded.role;
        }
      }

      // Check login requirement
      if (login) {
        if (!accessToken) {
          setIsAuthorized(false);
          setIsLoading(false);
          if (pathname !== redirectPath) {
            router.push(redirectPath);
          }
          return;
        }
      }

      // Check role requirement
      if (role.length > 0) {
        if (!accessToken) {
          setIsAuthorized(false);
          setIsLoading(false);
          if (pathname !== redirectPath) {
            router.push(redirectPath);
          }
          return;
        }

        if (!userRole || !role.includes(userRole)) {
          setIsAuthorized(false);
          setIsLoading(false);
          if (pathname !== redirectPath) {
            router.push(redirectPath);
          }
          return;
        }
      }

      // All checks passed
      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [login, role, redirectTo, router, pathname]);

  // Show loading state while checking
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Show nothing if not authorized (will redirect)
  if (isAuthorized === false) {
    return null;
  }

  // Render children if authorized
  return <>{children}</>;
}

export default AuthGuard;

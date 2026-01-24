import { useMemo } from "react";

interface JWTPayload {
  id?: string;
  role?: string;
  contact?: string;
  parentPhone?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

// Helper function to decode JWT token
const decodeJWT = (token: string): JWTPayload | null => {
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
};

/**
 * Hook to get parentPhone (contact) from accessToken stored in localStorage
 * The JWT payload contains a "contact" field which represents the parent phone
 * @returns parentPhone string (from contact field) or null if not found
 */
export const useGetParentPhone = (): string | null => {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return null;
    }

    const decoded = decodeJWT(accessToken);
    // Extract contact field (which represents parentPhone in the JWT payload)
    // Based on the JWT structure: { id, role, contact, iat, exp }
    return decoded?.contact || decoded?.parentPhone || null;
  }, []);
};

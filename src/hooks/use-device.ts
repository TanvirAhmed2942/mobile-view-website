"use client";
import { useState, useEffect } from "react";

export type DeviceType =
  | "mobile"
  | "tablet"
  | "laptop"
  | "desktop"
  | "lg"
  | "xl"
  | "2xl";

export interface DeviceInfo {
  device: DeviceType;
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
}

// Breakpoints based on Tailwind CSS defaults
const breakpoints = {
  mobile: 640, // sm
  tablet: 768, // md
  laptop: 1024, // lg
  desktop: 1280, // xl
  lg: 1280, // xl
  xl: 1536, // 2xl
  "2xl": 1536, // 2xl
};

/**
 * Custom hook to detect device type and screen width
 * @returns DeviceInfo object with device type and helper booleans
 */
export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    if (typeof window === "undefined") {
      return {
        device: "mobile",
        width: 0,
        isMobile: true,
        isTablet: false,
        isLaptop: false,
        isDesktop: false,
        isLg: false,
        isXl: false,
        is2Xl: false,
      };
    }

    return getDeviceInfo(window.innerWidth);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setDeviceInfo(getDeviceInfo(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceInfo;
}

/**
 * Get device information based on screen width
 * @param width - Screen width in pixels
 * @returns DeviceInfo object
 */
export function getDeviceInfo(width: number): DeviceInfo {
  let device: DeviceType = "mobile";

  if (width >= breakpoints["2xl"]) {
    device = "2xl";
  } else if (width >= breakpoints.xl) {
    device = "xl";
  } else if (width >= breakpoints.lg) {
    device = "lg";
  } else if (width >= breakpoints.desktop) {
    device = "desktop";
  } else if (width >= breakpoints.laptop) {
    device = "laptop";
  } else if (width >= breakpoints.tablet) {
    device = "tablet";
  } else {
    device = "mobile";
  }

  return {
    device,
    width,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isLaptop: device === "laptop",
    isDesktop:
      device === "desktop" ||
      device === "lg" ||
      device === "xl" ||
      device === "2xl",
    isLg: device === "lg" || device === "xl" || device === "2xl",
    isXl: device === "xl" || device === "2xl",
    is2Xl: device === "2xl",
  };
}

/**
 * Utility function to get device type from width (can be used outside React components)
 * @param width - Screen width in pixels
 * @returns DeviceType
 */
export function getDeviceType(width: number): DeviceType {
  return getDeviceInfo(width).device;
}

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    // Check browser history state
    if (typeof window !== "undefined") {
      setCanGoBack(window.history.length > 1);
      // For forward, we'll enable it if browser supports it
      // In practice, forward is limited in SPAs, so we'll keep it simple
      setCanGoForward(false);
    }
  }, [pathname]);

  const handlePrevious = () => {
    router.back();
  };

  const handleNext = () => {
    if (typeof window !== "undefined") {
      window.history.forward();
    }
  };

  const handleHome = () => {
    router.push("/user");
  };

  return (
    <div className="flex items-center justify-center gap-2 w-full px-2 sm:px-4 py-2 ">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={!canGoBack}
        className="flex-1 max-w-[100px] sm:max-w-[120px] h-10 text-xs sm:text-sm"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
      </Button>

      {/* Home Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleHome}
        className="flex-1 max-w-[100px] sm:max-w-[120px] h-10 text-xs sm:text-sm"
        aria-label="Home"
      >
        <Home className="w-4 h-4 mr-1" />
      </Button>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={!canGoForward}
        className="flex-1 max-w-[100px] sm:max-w-[120px] h-10 text-xs sm:text-sm"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}

export default Navigation;

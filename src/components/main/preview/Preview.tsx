"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { hydrateFromStorage } from "@/store/whySlice";

function Preview() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const whyMessage = useAppSelector((state) => state.why.whyMessage);

  // Hydrate from sessionStorage after mount (only if not already set)
  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, [dispatch]);

  const handleContinue = () => {
    // Navigate to Donate page (new flow: invite → why → preview → donate)
    router.push("/donate");
  };

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start pb-8">
        <NavBar />
        <div className="space-y-2 text-center px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Preview Message
          </h2>

          <p className="text-sm text-gray-500">
            This is what your friends will see.
          </p>
        </div>

        <div className="w-full px-4">
          <div className="w-full bg-white rounded-2xl p-4 sm:p-6">
            <div 
              className="whitespace-pre-wrap text-gray-800 break-words overflow-wrap-anywhere text-sm sm:text-base leading-relaxed"
              style={{ 
                wordBreak: "break-all", 
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                overflowX: "hidden"
              }}
            >
              {whyMessage || ""}
            </div>
          </div>
        </div>

        <div className="w-full px-4">
          <Button
            onClick={handleContinue}
            className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full"
          >
            Continue
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

export default Preview;

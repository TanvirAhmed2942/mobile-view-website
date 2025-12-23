"use client";

import NavBar from "@/components/common/navBar/navBar";

import { ScrollArea } from "@/components/ui/scroll-area";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { hydrateFromStorage } from "@/store/whySlice";

function Preview() {
  const dispatch = useAppDispatch();
  const whyMessage = useAppSelector((state) => state.why.whyMessage);

  // Hydrate from sessionStorage after mount (only if not already set)
  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, [dispatch]);

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />
        <div className="space-y-2 text-center ">
          <h2 className="text-2xl  font-semibold text-gray-800 mb-2">
            Preview Message
          </h2>

          <p className="text-sm  text-gray-500 ">
            This is what your friends will see.
          </p>
        </div>

        <div className="w-full bg-white rounded-2xl p-6">
          <div className="whitespace-pre-wrap text-gray-800">
            {whyMessage || ""}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default Preview;

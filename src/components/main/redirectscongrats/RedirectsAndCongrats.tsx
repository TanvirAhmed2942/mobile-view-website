import NavBar from "@/components/common/navBar/navBar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useIcon from "@/hooks/useIcon";
import React from "react";

function Redirects() {
  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />
        <div className="flex flex-col items-center justify-center gap-4 bg-white rounded-3xl p-6 space-y-4">
          <div className="h-16 w-16 rounded-full bg-[#f1e9f8] p-3 flex items-center justify-center">
            {useIcon({ name: "lock_icon" })}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Your are being redirected
          </h2>

          <div className="text-sm text-gray-500 text-center max-w-md">
            <div
              dangerouslySetInnerHTML={{
                __html: `<p>You are now being securely redirected to <a href="https://thesignatry.com" target="_blank" rel="noopener noreferrer" class="text-paul underline">thesignatry.com</a> to complete your donation.</p>`,
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 bg-[#e8e1f3] rounded-3xl p-4">
          <div className="min-h-12 min-w-12 rounded-full  flex items-center justify-center">
            {useIcon({ name: "target_icon" })}
          </div>
          <p className="text-xs text-gray-500 text-left max-w-md">
            Your donation will be tracked to ensure it contributes to the
            correct campaign chain.
          </p>
        </div>
        <Button className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2">
          {useIcon({ name: "donate_icon" })}
          Continue
        </Button>
      </div>
    </ScrollArea>
  );
}

export default Redirects;

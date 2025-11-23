import NavBar from "@/components/common/navBar/navBar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useIcon from "@/hooks/useIcon";
import Image from "next/image";
import React from "react";

function Congrats() {
  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />
        <div className="flex flex-col items-center justify-center gap-4 bg-white rounded-3xl p-6 space-y-4">
          <div className="h-16 w-16 rounded-full bg-[#f1e9f8] p-3 flex items-center justify-center">
            {useIcon({ name: "confetti_icon" })}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Congrats!
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Your friends have been notified.
          </p>
          <h2 className="text-2xl font-semibold text-paul text-center">
            You Have Started a Ripple Effect
          </h2>
          <div className="relative w-full h-40 ">
            <Image
              src="/drop.png"
              alt="congrats"
              fill
              priority
              quality={100}
              sizes="100px"
              className="object-contain"
            />
          </div>
          <Button className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2">
            Watch it Grow!
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

export default Congrats;

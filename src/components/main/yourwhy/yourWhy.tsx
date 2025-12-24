"use client";
import NavBar from "@/components/common/navBar/navBar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setWhyMessage, hydrateFromStorage } from "@/store/whySlice";

function YourWhy() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const whyMessage = useAppSelector((state) => state.why.whyMessage);
  const [message, setMessage] = useState(whyMessage || "");

  // Hydrate from sessionStorage after mount to avoid hydration mismatch
  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, [dispatch]);

  // Sync local state with Redux when Redux state changes (e.g., after hydration or when user navigates back)
  useEffect(() => {
    setMessage(whyMessage || "");
  }, [whyMessage]);

  // Update Redux whenever message changes so it's always in sync
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    dispatch(setWhyMessage(newMessage)); // Update Redux immediately
  };

  const handlePreview = () => {
    // Ensure the latest message is saved to Redux and sessionStorage
    dispatch(setWhyMessage(message));
    router.push("/preview");
  };
  const handleSend = () => {
    dispatch(setWhyMessage(message));
    router.push("/invite");
  };
  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />
        <div className="w-full space-y-2 text-left ">
          <h1 className="text-2xl  font-semibold text-gray-800 mb-2">
            Add Your WHY
          </h1>
          <p className="text-sm text-gray-500">
            Sharing your story can inspire others
          </p>
        </div>
        <div className="w-full space-y-2 text-left ">
          <h1 className="text-2xl  font-semibold text-gray-800 mb-2">
            Your WHY
          </h1>
          <Textarea
            placeholder="Add Your WHY"
            className="w-full h-60 resize-none"
            value={message}
            onChange={handleMessageChange}
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          <Button
            onClick={handlePreview}
            className="w-full bg-white hover:bg-paul-dark border border-[#8a48c4] text-black hover:text-white font-semibold py-6 px-4 rounded-full transition-all duration-200"
          >
            Preview
          </Button>
          <Button
            onClick={handleSend}
            className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full transition-all duration-200"
          >
            Send
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

export default YourWhy;

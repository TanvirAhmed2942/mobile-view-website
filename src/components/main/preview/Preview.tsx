"use client";

import NavBar from "@/components/common/navBar/navBar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useIcon from "@/hooks/useIcon";
import React from "react";

function Preview() {
  // Replace with actual selected contacts from state / store
  const contacts: string[] = ["01794685758", "01744687793"];

  const message = `Hey there,

I'm supporting a cause and thought you might be interested too.

This app lets our message reach tens, hundreds, even thousands of connected friends.
When you share with 12 friends, it starts a ripple effect of giving.

https://www.gopassit.org/friends

I started this with my $100 donation.
Please click the link, share with friends, and consider donating.
Cheers!`;

  /**
   * ✅ Best Web Fix:
   * Send SMS individually to avoid Android "Mass text" issue
   */
  const handleSendSMS = () => {
    if (contacts.length === 0) {
      alert("No contacts selected");
      return;
    }

    const encodedMessage = encodeURIComponent(message);

    contacts.forEach((number, index) => {
      setTimeout(() => {
        window.open(`sms:${number}?body=${encodedMessage}`, "_blank");
      }, index * 300); // delay prevents popup blocking
    });
  };

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />

        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Preview Message
          </h2>
          <p className="text-sm text-gray-500">
            This is what your friends will see.
          </p>
        </div>

        <div className="w-full bg-white rounded-2xl p-6">
          <p className="whitespace-pre-line text-gray-700">{message}</p>
        </div>

        <Button
          onClick={handleSendSMS}
          className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full flex items-center justify-center gap-2"
        >
          {useIcon({ name: "paper_plane_icon" })}
          Send to {contacts.length} Friends
        </Button>

        <p className="text-sm text-gray-500">
          Messages will open individually in your SMS app.
        </p>
      </div>
    </ScrollArea>
  );
}

export default Preview;

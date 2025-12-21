"use client";

import NavBar from "@/components/common/navBar/navBar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useIcon from "@/hooks/useIcon";
import React from "react";

function Preview() {
  // Example: replace these with actual selected contacts
  const contacts = ["01794685758", "01744687793"];

  const message = `Hey <FRIENDS NAME>,

I'm supporting [WHY from their prior page] and thought you might be interested too.

This app lets our message reach tens, hundreds, even thousands of connected friends. When you share with 12 friends, it starts a ripple effect of giving.

www.gopassit.org/friends

I started this with my $100 donation. Please click the link, share with friends, and consider donating. Cheers!`;

  const handleSendSMS = () => {
    // Join multiple numbers with comma
    const numbers = contacts.join(";");
    // Encode message for URI
    const encodedMessage = encodeURIComponent(message);
    // Open SMS app
    window.location.href = `sms:${numbers}?body=${encodedMessage}`;
  };

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
          <div
            dangerouslySetInnerHTML={{
              __html: `<p>Hey &lt;FRIENDS NAME&gt;,<br/><br/>I'm supporting [WHY from their prior page] and thought you might be interested too.<br/><br/>This app lets our message reach tens, hundreds, even thousands of connected friends. When you share with 12 friends, it starts a ripple effect of giving.<br/><br/><a href="www.gopassit.org/friends" class="text-blue-600 underline">www.gopassit.org/friends</a><br/><br/>I started this with my $100 donation. Please click the link, share with friends, and consider donating. Cheers!</p>`,
            }}
          />
        </div>

        <Button
          onClick={handleSendSMS}
          className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2"
        >
          {useIcon({ name: "paper_plane_icon" })} Send to 12 Friends
        </Button>
        <p className="text-sm text-gray-500 ">
          You can edit this message on the next screen.
        </p>
      </div>
    </ScrollArea>
  );
}

export default Preview;

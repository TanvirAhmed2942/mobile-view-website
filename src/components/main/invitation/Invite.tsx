import React from "react";

import { Button } from "@/components/ui/button";
import useIcon from "@/hooks/useIcon";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoAddOutline } from "react-icons/io5";
import NavBar from "@/components/common/navBar/navBar";
function Invite() {
  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />

        <div className="space-y-2 text-left ">
          <h2 className="text-2xl  font-semibold text-gray-800 mb-2">
            Invite Your Friends
          </h2>

          <p className="text-sm  text-gray-500 ">
            Invite up to 12 friends to grow your ripple giving. Start with a
            minimum of 3 friends.
          </p>
        </div>

        <Button className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full transition-all duration-200">
          {useIcon({ name: "contact_icon" })} Open Contacts
        </Button>

        <div className="w-full space-y-2   ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Search Contacts
          </h2>
          <Input
            type="text"
            placeholder="Search Contacts"
            className="w-full bg-white border-none shadow-none rounded-2xl pr-10 h-11"
          />
          {/* Search Results */}
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white rounded-2xl p-4">
              <div className="flex items-center gap-3 ">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-sm text-gray-500">+1234567890</p>
                </div>
              </div>
              <Button className="bg-[#f2ebf4] hover:bg-[#e2d4e4] text-white font-semibold py-2 px-4 rounded-full transition-all duration-200">
                <IoAddOutline className="size-5 text-paul" />
                <span className="text-sm font-medium text-paul">Add</span>
              </Button>
            </div>
            <div className="flex items-center justify-between bg-white rounded-2xl p-4">
              <div className="flex items-center gap-3 ">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-sm text-gray-500">+1234567890</p>
                </div>
              </div>
              <Button className="bg-[#f2ebf4] hover:bg-[#e2d4e4] text-white font-semibold py-2 px-4 rounded-full transition-all duration-200">
                <IoAddOutline className="size-5 text-paul" />
                <span className="text-sm font-medium text-paul">Add</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full space-y-2   ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Manual Entry
          </h2>
          <Input
            type="text"
            placeholder="Paste or Enter Phone Number"
            className="w-full bg-white border-none shadow-none rounded-2xl pr-10 h-11"
          />
          <p className="text-sm text-gray-500">
            Auto-match name if stored in contacts
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Select (2 of 12)
          </h2>
          {/* Search Results */}
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white rounded-2xl p-4">
              <div className="flex items-center gap-3 ">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-sm text-gray-500">+1234567890</p>
                </div>
              </div>
              <Button className="bg-paul hover:bg-paul-dark text-white font-semibold py-2 px-4 rounded-full transition-all duration-200">
                Invite
              </Button>
            </div>
            <div className="flex items-center justify-between bg-white rounded-2xl p-4">
              <div className="flex items-center gap-3 ">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-sm text-gray-500">+1234567890</p>
                </div>
              </div>
              <Button className="bg-paul hover:bg-paul-dark text-white font-semibold py-2 px-4 rounded-full transition-all duration-200">
                Invite
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Button className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full transition-all duration-200 mt-4">
        Continue
      </Button>
    </ScrollArea>
  );
}

export default Invite;

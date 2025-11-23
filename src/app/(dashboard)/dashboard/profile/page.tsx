import ProfileLayout from "@/components/dashboard/profile/profileLayout";
import React from "react";

function Page() {
  return (
    <div className="p-7 overflow-y-auto h-[calc(100vh-80px)]">
      <ProfileLayout />
    </div>
  );
}

export default Page;

import Navigation from "@/components/common/backbutton/backbutton";
import DowLine from "@/components/main/dowlineseed/DowLine";
import React from "react";

function page() {
  return (
    <div className="w-full bg-gray-100 rounded-2xl p-6">
      <DowLine />
      <div className="w-full flex justify-end px-4">
        <Navigation />
      </div>
    </div>
  );
}

export default page;

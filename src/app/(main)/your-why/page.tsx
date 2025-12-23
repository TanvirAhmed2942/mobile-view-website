import React from "react";
import YourWhy from "@/components/main/yourwhy/yourWhy";
import AuthGuard from "@/components/common/AuthGuard";
import Navigation from "@/components/common/backbutton/backbutton";

function page() {
  return (
    <AuthGuard login={true} role={["USER"]} redirectTo="/">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <YourWhy />
        <Navigation />
      </div>
    </AuthGuard>
  );
}

export default page;

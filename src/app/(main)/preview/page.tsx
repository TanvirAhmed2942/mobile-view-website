import React from "react";
import Preview from "@/components/main/preview/Preview";
import AuthGuard from "@/components/common/AuthGuard";
import Navigation from "@/components/common/backbutton/backbutton";

function page() {
  return (
    <AuthGuard login={true} role={["USER", "SUPER_ADMIN"]} redirectTo="/">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <Preview />
        <Navigation />
      </div>
    </AuthGuard>
  );
}

export default page;

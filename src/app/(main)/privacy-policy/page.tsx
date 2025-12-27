import AuthGuard from "@/components/common/AuthGuard";
import Navigation from "@/components/common/backbutton/backbutton";
import PrivacyPolicy from "@/components/main/privacypolicy/PrivacyPolicy";
import React from "react";

function page() {
  return (
    <AuthGuard login={true} role={["USER", "SUPER_ADMIN"]} redirectTo="/">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <PrivacyPolicy />
        <div className="w-full flex justify-end px-4">
          <Navigation />
        </div>
      </div>
    </AuthGuard>
  );
}

export default page;

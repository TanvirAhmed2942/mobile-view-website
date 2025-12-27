import React from "react";
import AboutCause from "@/components/main/aboutcause/AboutCause";
import AuthGuard from "@/components/common/AuthGuard";

function page() {
  return (
    <AuthGuard login={true} role={["USER", "SUPER_ADMIN"]} redirectTo="/">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <AboutCause />
      </div>
    </AuthGuard>
  );
}

export default page;

import AuthGuard from "@/components/common/AuthGuard";
import Redirects from "@/components/main/redirectscongrats/RedirectsAndCongrats";
import React from "react";

function page() {
  return (
    <AuthGuard login={true} role={["USER", "SUPER_ADMIN"]} redirectTo="/">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <Redirects />
      </div>
    </AuthGuard>
  );
}

export default page;

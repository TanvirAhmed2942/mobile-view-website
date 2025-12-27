import React from "react";
import Donate from "@/components/main/donate/Donate";
import AuthGuard from "@/components/common/AuthGuard";

function page() {
  return (
    <AuthGuard login={true} role={["USER", "SUPER_ADMIN"]} redirectTo="/">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <Donate />
      </div>
    </AuthGuard>
  );
}

export default page;

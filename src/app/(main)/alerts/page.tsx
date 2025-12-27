import AuthGuard from "@/components/common/AuthGuard";
import Alerts from "@/components/main/alerts/Alert";
import React from "react";

function page() {
  return (
    <AuthGuard login={true} role={["USER", "SUPER_ADMIN"]} redirectTo="/">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <Alerts />
      </div>
    </AuthGuard>
  );
}

export default page;

import Campaign from "@/components/main/campaign/Campaign";
import AuthGuard from "@/components/common/AuthGuard";
import React from "react";

function page() {
  return (
    <AuthGuard login={true} role={["USER", "SUPER_ADMIN"]} redirectTo="/">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <Campaign />
      </div>
    </AuthGuard>
  );
}

export default page;

import React from "react";
import ImpactLevel from "@/components/main/impactlevel/ImpactLevel";
import AuthGuard from "@/components/common/AuthGuard";

function page() {
  return (
    <AuthGuard login={true} role={["USER"]} redirectTo="/">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <ImpactLevel />
      </div>
    </AuthGuard>
  );
}

export default page;

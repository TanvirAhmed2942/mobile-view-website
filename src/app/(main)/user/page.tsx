import User from "@/components/main/user/User";
import React from "react";
import AuthGuard from "@/components/common/AuthGuard";

function page() {
  return (
    <AuthGuard login={true} role={["USER", "SUPER_ADMIN"]} redirectTo="/donate">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <User />
      </div>
    </AuthGuard>
  );
}

export default page;

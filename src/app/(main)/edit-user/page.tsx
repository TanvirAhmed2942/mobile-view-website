import React from "react";
import EditUser from "@/components/main/edituser/EditUser";
import AuthGuard from "@/components/common/AuthGuard";
import Navigation from "@/components/common/backbutton/backbutton";

function page() {
  return (
    <AuthGuard login={true} role={["USER"]} redirectTo="/">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <EditUser />
        <Navigation />
      </div>
    </AuthGuard>
  );
}

export default page;

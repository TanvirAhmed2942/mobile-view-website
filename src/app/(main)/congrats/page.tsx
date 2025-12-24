import AuthGuard from "@/components/common/AuthGuard";
import Congrats from "@/components/main/congrats/Congrats";
import React from "react";

function page() {
  return (
    <AuthGuard login={true} role={["USER"]} redirectTo="/">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <Congrats />
      </div>
    </AuthGuard>
  );
}

export default page;

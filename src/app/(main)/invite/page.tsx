import React from "react";
// import Invite from "@/components/main/invitation/Invite";
import Contact from "@/components/main/invitation/Contact";
import AuthGuard from "@/components/common/AuthGuard";
import Navigation from "@/components/common/backbutton/backbutton";
function page() {
  return (
    <AuthGuard login={true} role={["USER"]} redirectTo="/">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        {/* <Invite /> */}
        <Contact />
        <Navigation />
      </div>
    </AuthGuard>
  );
}

export default page;

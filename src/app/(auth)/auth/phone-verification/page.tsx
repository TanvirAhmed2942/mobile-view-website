import PhoneVerification from "@/components/auth/emailverification/emailVerification";
import React from "react";

function page() {
  return (
    <div className="w-full bg-gray-100 rounded-2xl p-6">
        <PhoneVerification />
    </div>
  );
}

export default page;

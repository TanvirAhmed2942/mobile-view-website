import React from "react";
import Preview from "@/components/main/preview/Preview";
import AuthGuard from "@/components/common/AuthGuard";

function page() {
  return (
    <AuthGuard login={true} role={["USER"]} redirectTo="/preview">
      <div className="w-full bg-gray-100 rounded-2xl p-6">
        <Preview />
      </div>
    </AuthGuard>
  );
}

export default page;

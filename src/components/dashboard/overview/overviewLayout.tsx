import React from "react";
import ActiveRequests from "./activeRequests";
import InpageNotifications from "./inpageNotifications";
import RecentTransactions from "./recentTransaction";
function OverviewLayout() {
  return (
    <div className="space-y-10 p-7 grid grid-cols-1 md:grid-cols-2  gap-10 w-full overflow-y-auto h-[calc(100vh-80px)]">
      <div className="space-y-10">
        <ActiveRequests />
        <InpageNotifications />
      </div>

      <RecentTransactions />
    </div>
  );
}

export default OverviewLayout;

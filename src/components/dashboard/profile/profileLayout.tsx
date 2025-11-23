import React from "react";
import PersonalInfo from "./personalInfo";
import PasswordAnd2FA from "./passwordAnd2F";
import ActivityLog from "./acitvityLog";

function ProfileLayout() {
  return (
    <div className="bg-white space-y-6">
      <PersonalInfo />
      <PasswordAnd2FA />
      <ActivityLog />
    </div>
  );
}

export default ProfileLayout;

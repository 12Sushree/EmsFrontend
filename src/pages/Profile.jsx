import React from "react";
import SideBar from "../components/common/SideBar";
import ProfileCard from "../components/common/ProfileCard";

function Profile() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">My Profile</h1>
        <ProfileCard />
      </div>
    </div>
  );
}

export default Profile;

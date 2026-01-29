import React from "react";
import SideBar from "../../components/common/SideBar";
import TeamSummary from "../../components/manager/TeamSummary";
import AssignTask from "../../components/manager/AssignTask";
import LeaveApproval from "../../components/manager/LeaveApproval";
import MonitorProgress from "../../components/manager/MonitorProgress"; // optional, include if needed

function MngDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Manager Dashboard
        </h1>

        <TeamSummary />
        <AssignTask />
        <LeaveApproval />
      </main>
    </div>
  );
}

export default MngDashboard;

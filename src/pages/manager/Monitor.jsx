import React from "react";
import SideBar from "../../components/common/SideBar";
import MonitorProgress from "../../components/manager/MonitorProgress";

function Monitor() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Team Progress
        </h1>

        <MonitorProgress />
      </main>
    </div>
  );
}

export default Monitor;

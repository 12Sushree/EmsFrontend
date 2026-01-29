import React from "react";
import SideBar from "../../components/common/SideBar";
import AttendanceTable from "../../components/employee/AttendanceTable";

function Attendance() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />

      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">My Attendance</h1>
          <p className="text-sm text-slate-500">
            View your daily check-in and check-out history
          </p>
        </header>

        <AttendanceTable />
      </main>
    </div>
  );
}

export default Attendance;

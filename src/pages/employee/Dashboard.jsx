import AttendanceCard from "../../components/employee/AttendanceCard";
import PerformanceCard from "../../components/employee/PerformanceCard";
import TaskList from "../../components/employee/TaskList";
import AnnouncementList from "../../components/common/AnnouncementList";
import SideBar from "../../components/common/SideBar";

function EmpDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Employee Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AttendanceCard />
          <PerformanceCard />
        </div>

        <div className="mt-6">
          <TaskList />
        </div>

        <div className="mt-6">
          <AnnouncementList />
        </div>
      </div>
    </div>
  );
}

export default EmpDashboard;

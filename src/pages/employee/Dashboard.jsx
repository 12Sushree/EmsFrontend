import AttendanceCard from "../../components/employee/AttendanceCard";
import PerformanceCard from "../../components/employee/PerformanceCard";
import TaskList from "../../components/employee/TaskList";
import AnnouncementList from "../../components/common/AnnouncementList";
import DashboardLayout from "../../components/common/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";

function EmpDashboard() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Employee Dashboard"
        subtitle="Overview of your performance, attendance and tasks"
      />

      <main className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <AttendanceCard />
          <PerformanceCard />
        </div>

        <section className="mt-8">
          <TaskList />
        </section>

        <section className="mt-8">
          <AnnouncementList />
        </section>
      </main>
    </DashboardLayout>
  );
}

export default EmpDashboard;

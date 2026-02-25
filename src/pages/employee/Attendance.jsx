import DashboardLayout from "../../components/common/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import AttendanceTable from "../../components/employee/AttendanceTable";

function Attendance() {
  return (
    <DashboardLayout>
      <PageHeader
        title="My Attendance"
        subtitle="View your daily check-in and check-out history"
      />

      <main className="mt-8">
        <AttendanceTable />
      </main>
    </DashboardLayout>
  );
}

export default Attendance;

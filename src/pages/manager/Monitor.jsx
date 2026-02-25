import DashboardLayout from "../../components/common/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import MonitorProgress from "../../components/manager/MonitorProgress";

function Monitor() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Team Progress"
        subtitle="Track and monitor your team's task performance"
      />

      <main className="mt-8">
        <MonitorProgress />
      </main>
    </DashboardLayout>
  );
}

export default Monitor;

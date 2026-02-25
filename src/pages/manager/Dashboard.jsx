import TeamSummary from "../../components/manager/TeamSummary";
import AssignTask from "../../components/manager/AssignTask";
import LeaveApproval from "../../components/manager/LeaveApproval";
import DashboardLayout from "../../components/common/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";

function MngDashboard() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Manager Dashboard"
        subtitle="Manage your team details, tasks and leaves"
      />

      <main className="space-y=8">
        <section className="mt-8">
          <TeamSummary />
        </section>

        <section className="mt-8">
          <AssignTask />
        </section>

        <section className="mt-8">
          <LeaveApproval />
        </section>
      </main>
    </DashboardLayout>
  );
}

export default MngDashboard;

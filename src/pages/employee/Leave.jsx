import DashboardLayout from "../../components/common/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import LeaveForm from "../../components/employee/LeaveForm";
import MyLeaves from "../../components/employee/MyLeaves";

export default function Leave() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Leave Management"
        subtitle="Apply for leave and track your leave history"
      />

      <main className="space-y-8">
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Apply for Leave</h2>
          <LeaveForm />
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-4">My Leave Requests</h2>
          <MyLeaves />
        </section>
      </main>
    </DashboardLayout>
  );
}

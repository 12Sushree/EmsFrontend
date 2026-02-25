import DashboardLayout from "../../components/common/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import AddEmployeeForm from "../../components/manager/AddEmployeeForm";

function AddEmployee() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Add Employee"
        subtitle="Search and assign employees to your team"
      />

      <main className="mt-8">
        <AddEmployeeForm />
      </main>
    </DashboardLayout>
  );
}

export default AddEmployee;

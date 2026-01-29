import SideBar from "../../components/common/SideBar";
import LeaveForm from "../../components/employee/LeaveForm";
import MyLeaves from "../../components/employee/MyLeaves";

export default function Leave() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Leave Management</h1>

        <LeaveForm />
        <MyLeaves />
      </div>
    </div>
  );
}

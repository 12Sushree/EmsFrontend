import React from "react";
import SideBar from "../../components/common/SideBar";
import AddEmployeeForm from "../../components/manager/AddEmployeeForm";

function AddEmployee() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Add Employee</h1>

        <AddEmployeeForm />
      </main>
    </div>
  );
}

export default AddEmployee;

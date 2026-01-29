import React, { useState, useEffect } from "react";
import {
  addEmployee,
  getProfileByName,
} from "../../features/manager/managerAPI";
import Alert from "../common/Alert";

function AddEmployeeForm() {
  const [empName, setEmpName] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await getProfileByName(empName);
      const empId = res.data.user._id;

      await addEmployee(empId);
      setMessage({ type: "success", text: "Employee added to your team!" });
      setEmpName("");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to add employee",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="card mb-6 max-w-lg">
      {message && (
        <div className="mb-4">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="empname" className="block mb-2 font-semibold">
          Employee Name:
        </label>

        <input
          type="text"
          id="empname"
          value={empName}
          onChange={(e) => setEmpName(e.target.value)}
          placeholder="Enter Employee Name"
          className="input"
          required
        />

        <button
          type="submit"
          className="btn btn-primary btn-primary-glow w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;

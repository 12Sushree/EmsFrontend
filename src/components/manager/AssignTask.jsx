import React, { useEffect, useState } from "react";
import { assignTask } from "../../features/manager/managerAPI";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "../../features/manager/managerSlice";
import Alert from "../common/Alert";

function AssignTask() {
  const dispatch = useDispatch();
  const {
    team = [],
    teamSize,
    loading,
    error,
  } = useSelector((state) => state.manager);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await assignTask(form);
      setMessage({ type: "success", text: "Task Assigned!" });
      setForm({ title: "", description: "", assignedTo: "" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to assign task",
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (error) setMessage({ type: "error", text: error });
  }, [error]);

  if (loading) return <p className="text-slate-500 text-sm">Loading team...</p>;

  return (
    <div className="card mb-6 max-w-lg">
      <h2 className="font-bold text-lg mb-4">Assign Task</h2>

      {message && (
        <div className="mb-4">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="input"
        />

        <input
          type="text"
          placeholder="Task Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="input"
        />

        <select
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          required
          className="input"
        >
          <option value="" disabled>
            Select Employee
          </option>
          {team.map((emp) => (
            <option value={emp.id} key={emp.id}>
              {emp.userName}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="btn btn-primary btn-primary-glow w-full disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Assigning..." : "Assign"}
        </button>
      </form>
    </div>
  );
}

export default AssignTask;

import React, { useEffect, useState } from "react";
import { applyLeave } from "../../features/employee/employeeAPI";
import Alert from "../common/Alert";

function LeaveForm() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    reason: "",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.from > form.to) {
      setMessage({
        type: "error",
        text: "End date cannot be before start date",
      });
      return;
    }

    try {
      setLoading(true);
      await applyLeave(form);
      setMessage({
        type: "success",
        text: "Leave applied successfully",
      });
      setForm({ from: "", to: "", reason: "" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to apply leave",
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
      <h2 className="font-bold text-lg mb-4">Apply Leave</h2>

      {message && (
        <div className="mb-4">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={form.from}
          onChange={(e) => setForm({ ...form, from: e.target.value })}
          className="input"
          required
        />

        <input
          type="date"
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
          className="input"
          required
        />

        <input
          type="text"
          placeholder="Reason"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          className="input"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary btn-primary-glow w-full disabled:opacity-50"
        >
          {loading ? "Applying..." : "Apply Leave"}
        </button>
      </form>
    </div>
  );
}

export default LeaveForm;

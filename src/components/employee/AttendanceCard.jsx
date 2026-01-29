import React, { useEffect, useState } from "react";
import { checkIn, checkOut } from "../../features/employee/employeeAPI";
import Alert from "../common/Alert";

function AttendanceCard() {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      await checkIn();
      setStatus("Checked In");
      setMessage({ type: "success", text: "Checked in successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Check-in failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      await checkOut();
      setStatus("Checked Out");
      setMessage({ type: "success", text: "Checked out successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Check-out failed",
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
    <div className="card">
      <h2 className="font-bold text-lg mb-4">Attendance</h2>

      {message && (
        <div className="mb-3">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleCheckIn}
          disabled={loading}
          className="btn btn-success btn-success-glow w-1/2 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Check In"}
        </button>

        <button
          onClick={handleCheckOut}
          disabled={loading}
          className="btn btn-danger btn-danger-glow w-1/2 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Check Out"}
        </button>
      </div>

      {status && (
        <p className="mt-3 text-sm text-gray-600">
          Current status: <span className="font-semibold">{status}</span>
        </p>
      )}
    </div>
  );
}

export default AttendanceCard;

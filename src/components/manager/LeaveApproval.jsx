import React, { useEffect, useState } from "react";
import { getAllLeaves, updateLeave } from "../../features/manager/managerAPI";
import Alert from "../common/Alert";

function LeaveApproval() {
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const allLeaves = async () => {
    setLoading(true);
    try {
      const res = await getAllLeaves();
      setLeaves(res.data.data || []);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to fetch leaves",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allLeaves();
  }, []);

  const update = async (id, status) => {
    try {
      setLoadingId(id);
      await updateLeave(id, status);
      setMessage({ type: "success", text: `Leave ${status}` });
      allLeaves();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update leave",
      });
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (!loading && leaves.length === 0) {
      setMessage({
        type: "info",
        text: "No Leave Record Found!",
      });
    }
  }, [leaves]);

  return (
    <div className="bg-white p-5 shadow rounded-xl">
      <h2 className="font-bold text-lg mb-4">Leave Requests</h2>

      {message && (
        <div className="mb-4">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full rounded overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="table-th">Employee</th>
              <th className="table-th">From</th>
              <th className="table-th">To</th>
              <th className="table-th">Reason</th>
              <th className="table-th">Status</th>
              <th className="table-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className="hover:bg-slate-50 transition">
                <td className="table-td">{leave.userId?.userName}</td>
                <td className="table-td">
                  {new Date(leave.from).toLocaleDateString("en-IN")}
                </td>
                <td className="table-td">
                  {new Date(leave.to).toLocaleDateString("en-IN")}
                </td>
                <td className="table-td">{leave.reason}</td>
                <td className="table-td">{leave.status}</td>
                <td className="table-td flex gap-2">
                  <button
                    onClick={() => update(leave._id, "Approved")}
                    disabled={loadingId === leave._id}
                    className={`px-3 py-1 rounded text-white ${
                      loadingId === leave._id
                        ? "bg-green-300 cursor-not-allowed"
                        : "btn btn-success btn-success-glow"
                    }`}
                  >
                    ✔
                  </button>
                  <button
                    onClick={() => update(leave._id, "Rejected")}
                    disabled={loadingId === leave._id}
                    className={`px-3 py-1 rounded text-white ${
                      loadingId === leave._id
                        ? "bg-red-300 cursor-not-allowed"
                        : "btn btn-danger btn-danger-glow"
                    }`}
                  >
                    ✖
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveApproval;

import React, { useEffect, useState } from "react";
import { myLeaves } from "../../features/employee/employeeAPI";
import Alert from "../common/Alert";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await myLeaves();
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

    fetchData();
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (!loading && leaves.length === 0) {
      setMessage({
        type: "info",
        text: "No leave records found",
      });
    }
  }, [leaves, loading]);

  if (loading) {
    return (
      <div className="card text-center text-slate-500">Loading leaves...</div>
    );
  }

  return (
    <div className="card">
      <h2 className="font-bold text-lg mb-4">My Leave History</h2>

      {message && (
        <div className="card">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full rounded overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="table-th">From</th>
              <th className="table-th">To</th>
              <th className="table-th">Reason</th>
              <th className="table-th">Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className="hover:bg-slate-50 transition">
                <td className="table-td">
                  {new Date(leave.from).toLocaleDateString("en-IN")}
                </td>
                <td className="table-td">
                  {new Date(leave.to).toLocaleDateString("en-IN")}
                </td>
                <td className="table-td">{leave.reason}</td>
                <td className="table-td">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : leave.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                      }
                    `}
                  >
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyLeaves;

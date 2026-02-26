import { useEffect, useState } from "react";
import { myLeaves } from "../../store/employee/employeeAPI";
import Alert from "../common/Alert";
import Button from "../common/Button";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await myLeaves(page);
      setLeaves(res.data.data || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to fetch leaves",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (alert) return;

    if (!loading && leaves.length === 0) {
      setAlert({
        type: "info",
        message: "No leave records found",
      });
    }
  }, [leaves, loading, alert]);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  if (loading) {
    return (
      <div className="card text-center text-slate-500">Loading leaves...</div>
    );
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg mb-4">My Leave History</h2>
        <Button onClick={fetchData}>⟳</Button>
      </div>

      {alert && (
        <div className="card">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table-container">
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

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            ⬅ Prev
          </Button>

          <span className="text-sm font-semibold">
            Page {page} of {totalPages}
          </span>

          <Button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next ➡
          </Button>
        </div>
      )}
    </div>
  );
}

export default MyLeaves;

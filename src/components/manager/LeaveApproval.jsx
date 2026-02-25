import { useEffect, useState } from "react";
import { getAllLeaves, updateLeave } from "../../store/manager/managerAPI";
import Alert from "../common/Alert";
import Button from "../common/Button";

function LeaveApproval() {
  const [leaves, setLeaves] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allLeaves = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getAllLeaves(page);
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
    allLeaves(page);
  }, [page]);

  const update = async (id, status) => {
    try {
      setLoadingId(id);
      await updateLeave(id, status);
      setAlert({ type: "success", message: `Leave ${status}` });
      allLeaves(page);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to update leave",
      });
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  useEffect(() => {
    if (alert) return;
    if (!loading && leaves.length === 0) {
      setAlert({
        type: "info",
        message: "No Leave Record Found!",
      });
    }
  }, [leaves, loading, alert]);

  if (loading) {
    return (
      <div className="card text-center text-slate-500">
        Loading leave requests.....
      </div>
    );
  }

  return (
    <div className="bg-white p-5 shadow rounded-xl">
      <h2 className="font-bold text-lg mb-4">Leave Requests</h2>

      {alert && (
        <div className="mb-4">
          <Alert type={alert.type} message={alert.message} />
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
            {leaves.map((leave) => {
              const leaveDate = new Date(leave.to);
              leaveDate.setHours(0, 0, 0, 0);

              const isExpired = leaveDate < today;
              const isProcessed = leave.status !== "Pending";
              const isLoading = loadingId === leave._id;

              const disableButtons = isExpired || isProcessed || isLoading;

              return (
                <tr key={leave._id} className="hover:bg-slate-50 transition">
                  <td className="table-td">{leave.userId?.userName}</td>
                  <td className="table-td">
                    {new Date(leave.from).toLocaleDateString("en-IN")}
                  </td>
                  <td className="table-td">
                    {new Date(leave.to).toLocaleDateString("en-IN")}
                  </td>
                  <td className="table-td">{leave.reason}</td>
                  <td className="table-td font-semibold">{leave.status}</td>
                  <td className="table-td flex gap-2">
                    <Button
                      onClick={() => update(leave._id, "Approved")}
                      disabled={disableButtons}
                      className={`px-3 py-1 rounded text-white ${
                        disableButtons
                          ? "bg-green-200 cursor-not-allowed"
                          : "btn-success btn-success-glow"
                      }`}
                    >
                      ✔
                    </Button>
                    <Button
                      onClick={() => update(leave._id, "Rejected")}
                      disabled={disableButtons}
                      className={`px-3 py-1 rounded text-white ${
                        disableButtons
                          ? "bg-red-200 cursor-not-allowed"
                          : "btn-danger btn-danger-glow"
                      }`}
                    >
                      ✖
                    </Button>
                  </td>
                </tr>
              );
            })}
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

export default LeaveApproval;

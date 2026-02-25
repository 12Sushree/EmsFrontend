import { useEffect, useState } from "react";
import { monitorProgress } from "../../store/manager/managerAPI";
import Alert from "../common/Alert";
import Button from "../common/Button";

function MonitorProgress() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await monitorProgress();
      setData(res.data?.summary || null);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to fetch progress",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  useEffect(() => {
    if (alert) return;
    if (!loading && !data) {
      setAlert({
        type: "info",
        message: "No Progress available!",
      });
    }
  }, [data, loading, alert]);

  if (loading) {
    return (
      <div className="card text-center text-slate-500">Loading progress...</div>
    );
  }

  return (
    <div>
      {alert && (
        <div className="card">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      {data && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">Team Progress</h2>

            <Button onClick={fetchData}>⟳</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-2 bg-slate-50 rounded-lg text-center">
              <p className="text-sm text-slate-500">Total Tasks</p>
              <h2 className="text-xl font-bold">{data.totalTasks ?? 0}</h2>
            </div>

            <div className="p-2 bg-slate-50 rounded-lg text-center">
              <p className="text-sm text-slate-500">Completed Tasks</p>
              <h2 className="text-xl font-bold text-green-600">
                {data.totalDone ?? 0}
              </h2>
            </div>

            <div className="p-2 bg-slate-50 rounded-lg text-center">
              <p className="text-sm text-slate-500">Pending Tasks</p>
              <h2 className="text-xl font-bold text-red-600">
                {data.totalPending ?? 0}
              </h2>
            </div>

            <div className="col-span-3 p-2 bg-slate-50 rounded-lg text-center">
              <p className="text-sm text-slate-500">Completion Rate</p>
              <h2 className="text-xl font-bold text-blue-600">
                {data.completionRate ?? 0}%
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MonitorProgress;

import { useEffect, useState } from "react";
import { myPerformance } from "../../store/employee/employeeAPI";
import Alert from "../common/Alert";
import Button from "../common/Button";

function PerformanceCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const fetchData = async () => {
    try {
      const res = await myPerformance();
      setData(res.data);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to load performance",
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
        message: "No Details available!",
      });
    }
  }, [data, loading, alert]);

  if (loading) {
    return (
      <div className="card text-center text-slate-500">
        Loading performance.....
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg mb-4">My Performance</h2>
        <Button onClick={fetchData}>⟳</Button>
      </div>

      {alert && (
        <div className="card">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-2 bg-slate-50 rounded-lg text-center">
          <p className="text-sm text-slate-500">Total Hours</p>
          <p className="text-xl font-bold text-blue-600">
            {data?.workingHours ?? 0}
          </p>
        </div>

        <div className="p-2 bg-slate-50 rounded-lg text-center">
          <p className="text-sm text-slate-500">Total Tasks</p>
          <p className="text-xl font-bold text-blue-600">
            {data?.performance?.totalTasks ?? 0}
          </p>
        </div>

        <div className="p-2 bg-slate-50 rounded-lg text-center">
          <p className="text-sm text-slate-500">Completed Tasks</p>
          <p className="text-xl font-bold text-green-600">
            {data?.performance?.completed ?? 0}
          </p>
        </div>

        <div className="p-2 bg-slate-50 rounded-lg text-center">
          <p className="text-sm text-slate-500">Pending Tasks</p>
          <p className="text-xl font-bold text-orange-600">
            {data?.performance?.pending ?? 0}
          </p>
        </div>

        <div className="p-2 bg-slate-50 rounded-lg text-center">
          <p className="text-sm text-slate-500">Completion Rate</p>
          <p className="text-xl font-bold text-orange-600">
            {data?.performance?.completionRate ?? 0}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default PerformanceCard;

import React, { useEffect, useState } from "react";
import { monitorProgress } from "../../features/manager/managerAPI";
import Alert from "../common/Alert";

function MonitorProgress() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await monitorProgress();
        setData(res.data.summary);
      } catch (err) {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to fetch progress",
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
    if (!loading && !data) {
      setMessage({
        type: "info",
        text: "No Progress available!",
      });
    }
  }, [data, loading]);

  if (loading) {
    return (
      <div className="card text-center text-slate-500">Loading progress...</div>
    );
  }

  return (
    <div>
      {message && (
        <div className="card">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-2 bg-slate-50 rounded-lg text-center">
          <p className="text-sm text-slate-500">Total Tasks</p>
          <h2 className="text-xl font-bold">{data.totalTasks}</h2>
        </div>

        <div className="p-2 bg-slate-50 rounded-lg text-center">
          <p className="text-sm text-slate-500">Completed Tasks</p>
          <h2 className="text-xl font-bold text-green-600">{data.totalDone}</h2>
        </div>

        <div className="p-2 bg-slate-50 rounded-lg text-center">
          <p className="text-sm text-slate-500">Pending Tasks</p>
          <h2 className="text-xl font-bold text-red-600">
            {data.totalPending}
          </h2>
        </div>

        <div className="col-span-3 p-2 bg-slate-50 rounded-lg text-center">
          <p className="text-sm text-slate-500">Completion Rate</p>
          <h2 className="text-xl font-bold text-blue-600">
            {data.completionRate}%
          </h2>
        </div>
      </div>
    </div>
  );
}

export default MonitorProgress;

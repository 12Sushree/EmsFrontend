import React, { useEffect, useState } from "react";
import { myPerformance } from "../../features/employee/employeeAPI";
import Alert from "../common/Alert";

function PerformanceCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await myPerformance();
        setData(res.data);
      } catch (err) {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to load performance",
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

  if (loading) {
    return (
      <div className="card text-center text-slate-500">
        Loading performance...
      </div>
    );
  }

  useEffect(() => {
    if (!loading && !data) {
      setMessage({
        type: "info",
        text: "No Details available!",
      });
    }
  }, [data, loading]);

  return (
    <div className="card">
      <h2 className="font-bold text-lg mb-4">My Performance</h2>

      {message && (
        <div className="card">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-2 bg-slate-50 rounded-lg text-center">
          <p className="text-sm text-slate-500">Total Hours</p>
          <p className="text-xl font-bold text-blue-600">
            {data?.workingHours?.totalHrs ?? 0}
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
      </div>
    </div>
  );
}

export default PerformanceCard;

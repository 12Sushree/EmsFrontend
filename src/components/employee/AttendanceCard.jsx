import { useEffect, useState } from "react";
import {
  checkIn,
  checkOut,
  myAttendance,
} from "../../store/employee/employeeAPI";
import Alert from "../common/Alert";
import Button from "../common/Button";

function AttendanceCard() {
  const [today, setToday] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingToday, setLoadingToday] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-CA");
  };

  const loadToday = async () => {
    try {
      setLoadingToday(true);

      const res = await myAttendance();
      const todayDate = formatDate(new Date());

      const record = res.data.data.find(
        (r) => formatDate(r.date) === todayDate,
      );

      setToday(record || null);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to load!",
      });
    } finally {
      setLoadingToday(false);
    }
  };

  useEffect(() => {
    loadToday();
  }, []);

  const sessions = today?.sessions || [];

  const lastSession =
    sessions.length > 0 ? sessions[sessions.length - 1] : null;

  const isCheckedIn =
    lastSession && lastSession.checkIn && !lastSession.checkOut;

  const handleCheckIn = async () => {
    try {
      setLoading(true);

      const res = await checkIn();
      setToday(res.data.record);

      setAlert({ type: "success", message: "Checked in successfully" });
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Check-in failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);

      const res = await checkOut();
      setToday(res.data.record);

      setAlert({ type: "success", message: "Checked out successfully" });
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Check-out failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTime = () => {
    if (!today?.sessions) return 0;

    const now = new Date();
    let total = 0;

    today.sessions.forEach((s) => {
      if (!s.checkIn) return;

      const start = new Date(s.checkIn);
      const end = s.checkOut ? new Date(s.checkOut) : now;

      total += end - start;
    });

    return total;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [today]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  if (loadingToday) {
    return (
      <div className="card text-center text-slate-500">
        Loading Attendance.....
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="font-bold text-lg mb-4">Attendance</h2>

      {alert && (
        <div className="mb-3">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <div className="flex gap-4">
        <Button
          onClick={handleCheckIn}
          disabled={loading || isCheckedIn}
          className="btn-success btn-success-glow w-1/2"
        >
          {loading ? "Processing..." : "Check In"}
        </Button>

        <Button
          onClick={handleCheckOut}
          disabled={loading || !isCheckedIn}
          className="btn-danger btn-danger-glow w-1/2"
        >
          {loading ? "Processing..." : "Check Out"}
        </Button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">Time in Office</p>

        <p className="text-2xl font-bold text-indigo-600">
          {formatTime(elapsed)}
        </p>
      </div>

      {today && (
        <div className="mt-4 text-sm text-gray-600 space-y-1">
          <p>
            Status: <b>{today.status}</b>
          </p>
          {today.workingHours !== undefined && (
            <p>
              Working Hours: <b>{today.workingHours}</b>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default AttendanceCard;

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

  const handleCheckIn = async () => {
    try {
      setLoading(true);

      await checkIn();

      setToday((prev) => ({
        ...prev,
        checkIn: new Date().toISOString(),
        status: "Present",
      }));

      await loadToday();

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

      await checkOut();

      setToday((prev) => ({
        ...prev,
        checkOut: new Date().toISOString(),
      }));

      await loadToday();

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

  const hasCheckedIn = Boolean(today?.checkIn);
  const hasCheckedOut = Boolean(today?.checkOut);

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
          disabled={loading || hasCheckedIn}
          className="btn-success btn-success-glow w-1/2"
        >
          {loading ? "Processing..." : "Check In"}
        </Button>

        <Button
          onClick={handleCheckOut}
          disabled={loading || !hasCheckedIn || hasCheckedOut}
          className="btn-danger btn-danger-glow w-1/2"
        >
          {loading ? "Processing..." : "Check Out"}
        </Button>
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

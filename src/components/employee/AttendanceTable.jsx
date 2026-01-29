import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendance } from "../../features/employee/employeeSlice";
import Alert from "../common/Alert";

function AttendanceTable() {
  const dispatch = useDispatch();
  const {
    attendance = [],
    loading,
    error,
  } = useSelector((state) => state.employee);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (error) {
      setMessage({
        type: "error",
        text: error,
      });
    } else if (!loading && attendance.length === 0) {
      setMessage({
        type: "info",
        text: "No Attendance Record Found!",
      });
    }
  }, [error, attendance, loading]);

  if (loading) {
    return (
      <div className="card text-center text-slate-500">
        Loading attendance...
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="font-semibold text-lg mb-4">Attendance History</h2>

      {message && (
        <div className="card">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full rounded overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="table-th">Date</th>
              <th className="table-th">Check In</th>
              <th className="table-th">Check Out</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((record) => (
              <tr key={record._id} className="hover:bg-slate-50 transition">
                <td className="table-td font-medium">{record.date || "-"}</td>
                <td className="table-td">{record.checkIn || "-"}</td>
                <td className="table-td">{record.checkOut || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceTable;

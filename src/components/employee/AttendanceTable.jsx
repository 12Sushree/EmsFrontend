import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendance, setPage } from "../../store/employee/employeeSlice";
import Alert from "../common/Alert";
import Button from "../common/Button";

const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "-");
const formatTime = (d) =>
  d
    ? new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "-";

function AttendanceTable() {
  const dispatch = useDispatch();
  const {
    attendance,
    attendanceLoading,
    error,
    page = 1,
    pages = 1,
  } = useSelector((state) => state.employee);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    dispatch(fetchAttendance(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (error) {
      setAlert({
        type: "error",
        message: error,
      });

      return;
    }

    if (!attendanceLoading && attendance && attendance.length === 0) {
      setAlert({
        type: "info",
        message: "No attendance record found!",
      });
    }
  }, [error, attendance, attendanceLoading]);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  if (attendanceLoading) {
    return (
      <div className="card text-center text-slate-500">
        Loading attendance.....
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="font-semibold text-lg mb-4">Attendance History</h2>

      {alert && (
        <div className="card">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full rounded overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="table-th">Date</th>
              <th className="table-th">Check In</th>
              <th className="table-th">Check Out</th>
              <th className="table-th">Hours</th>
              <th className="table-th">Status</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((record) => (
              <tr key={record._id} className="hover:bg-slate-50 transition">
                <td className="table-td font-medium">
                  {formatDate(record.date)}
                </td>
                <td className="table-td">
                  {formatTime(record.checkIn) || "-"}
                </td>
                <td className="table-td">
                  {formatTime(record.checkOut) || "-"}
                </td>
                <td className="table-td">{record.workingHours ?? "-"}</td>
                <td
                  className={`table-td font-semibold ${record.status === "Present" ? "text-green-600" : record.status === "Half Day" ? "text-orange-600" : "text-red-600"}`}
                >
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex justify-center items-center gap-4 -mt-6">
          <Button
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
          >
            ⬅ Prev
          </Button>

          <span className="font-semibold">
            Page {page} of {pages}
          </span>

          <Button
            disabled={page === pages}
            onClick={() => dispatch(setPage(page + 1))}
          >
            Next ➡
          </Button>
        </div>
      )}
    </div>
  );
}

export default AttendanceTable;

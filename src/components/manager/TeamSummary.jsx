import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "../../features/manager/managerSlice";
import api from "../../services/axios";
import Alert from "../common/Alert";

function TeamSummary() {
  const dispatch = useDispatch();
  const { team, teamSize, loading, error } = useSelector(
    (state) => state.manager,
  );

  const [manager, setManager] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    dispatch(fetchTeam());

    const loadProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setManager(res.data.user.userName);
      } catch (err) {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to Load Profile!",
        });
      }
    };

    loadProfile();
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
    } else if (!loading && (!team || team.length === 0)) {
      setMessage({
        type: "info",
        text: "No Member Found!",
      });
    }
  }, [error, team, loading]);

  if (loading) {
    return (
      <div className="card text-center text-slate-500">Loading team...</div>
    );
  }

  return (
    <div className="card mb-6">
      <h2 className="font-bold text-xl mb-4">My Team</h2>

      {message && (
        <div className="card">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <div className="flex justify-between mb-4 text-sm text-slate-600">
        <p>
          <strong>Manager:</strong> {manager}
        </p>
        <p>
          <strong>Team Size:</strong> {teamSize}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full rounded overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="table-th">Name</th>
              <th className="table-th">Email</th>
              <th className="table-th">Attendance</th>
              <th className="table-th">Total Tasks</th>
              <th className="table-th">Completed Tasks</th>
            </tr>
          </thead>
          <tbody>
            {team.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50 transition">
                <td className="table-td">{emp.userName}</td>
                <td className="table-td">{emp.email}</td>
                <td className="table-td">{emp.attendanceRecords ?? 0}</td>
                <td className="table-td">{emp.tasks?.total ?? 0}</td>
                <td className="table-td">{emp.tasks?.completed ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamSummary;

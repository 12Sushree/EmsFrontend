import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "../../store/manager/managerSlice";
import api from "../../services/axios";
import Alert from "../common/Alert";
import Button from "../common/Button";
import EmployeeActions from "./EmployeeActions";
import { FiSettings } from "react-icons/fi";
import { IoIosRemoveCircle } from "react-icons/io";
import { removeEmployee } from "../../store/manager/managerAPI";

function TeamSummary() {
  const dispatch = useDispatch();
  const {
    team = [],
    teamSize,
    totalPages = 1,
    loading,
    error,
  } = useSelector((state) => state.manager);

  const [manager, setManager] = useState("");
  const [alert, setAlert] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [confirmEmp, setConfirmEmp] = useState(null);

  const removeHandler = async () => {
    if (!confirmEmp) return;

    try {
      await removeEmployee(confirmEmp.id);
      dispatch(fetchTeam(page));

      setAlert({
        type: "success",
        message: "Employee removed successfully!",
      });

      setConfirmEmp(null);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to Remove Employee!",
      });
    }
  };

  useEffect(() => {
    dispatch(fetchTeam(page));
  }, [dispatch, page]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setManager(res.data.user.userName);
      } catch (err) {
        setAlert({
          type: "error",
          message: err.response?.data?.message || "Failed to Load Profile!",
        });
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  useEffect(() => {
    if (error) {
      setAlert({
        type: "error",
        message: error,
      });
      return;
    }

    if (!loading && (!team || team.length === 0) && !alert) {
      setAlert({
        type: "info",
        message: "No Member Found!",
      });
    }
  }, [error, team, loading, alert]);

  if (loading) {
    return (
      <div className="card text-center text-slate-500">Loading team...</div>
    );
  }

  return (
    <div className="card mb-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg mb-4">My Team</h2>
        <Button onClick={() => dispatch(fetchTeam(page))}>⟳</Button>
      </div>

      {alert && (
        <div className="card">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <div className="flex justify-between mb-4 text-sm text-slate-600">
        <p>
          <strong>Manager:</strong> {manager}
        </p>
        <p>
          <strong>Team Size:</strong> {teamSize ?? team.length}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table-container">
          <thead className="bg-slate-100">
            <tr>
              <th className="table-th">Employee ID</th>
              <th className="table-th">Name</th>
              <th className="table-th">Email</th>
              <th className="table-th">Attendance</th>
              <th className="table-th">Total Tasks</th>
              <th className="table-th">Completed Tasks</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>

          <tbody>
            {team.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50 transition">
                <td className="table-td">{emp.empId}</td>
                <td className="table-td">{emp.userName}</td>
                <td className="table-td">{emp.email}</td>
                <td className="table-td">{emp.attendanceRecords ?? 0}</td>
                <td className="table-td">{emp.tasks?.total ?? 0}</td>
                <td className="table-td">{emp.tasks?.completed ?? 0}</td>
                <td className="table-td">
                  <Button
                    className="btn-primary btn-primary-glow mr-1"
                    onClick={() => setSelectedEmp(emp)}
                  >
                    <FiSettings />
                  </Button>
                  <Button
                    className="btn-danger btn-danger-glow"
                    onClick={() => setConfirmEmp(emp)}
                  >
                    <IoIosRemoveCircle />
                  </Button>
                </td>
              </tr>
            ))}
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

      {selectedEmp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <Button
              className="btn-danger btn-danger-glow"
              onClick={() => setSelectedEmp(null)}
            >
              ✖
            </Button>

            <h3 className="text-lg font-semibold mb-4">
              {selectedEmp.userName}
            </h3>

            <EmployeeActions employee={selectedEmp} />
          </div>
        </div>
      )}

      {confirmEmp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Remove {confirmEmp.userName}?
            </h3>

            <p className="text-sm text-slate-600 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <Button
                className="btn-secondary"
                onClick={() => setConfirmEmp(null)}
              >
                Cancel
              </Button>

              <Button
                className="btn-danger btn-danger-glow"
                onClick={removeHandler}
              >
                Yes, Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamSummary;

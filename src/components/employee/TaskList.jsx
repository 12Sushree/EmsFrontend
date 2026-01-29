import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../features/employee/employeeSlice";
import { updateTask } from "../../features/employee/employeeAPI";
import Alert from "../common/Alert";

export default function TaskList() {
  const dispatch = useDispatch();
  const { tasks = [], loading, error } = useSelector((state) => state.employee);

  const [message, setMessage] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      await updateTask(id, status);
      setMessage({ type: "success", text: "Task status updated" });
      dispatch(fetchTasks());
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update task",
      });
    } finally {
      setUpdatingId(null);
    }
  };

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
    } else if (!loading && tasks.length === 0) {
      setMessage({
        type: "info",
        text: "No tasks assigned",
      });
    }
  }, [error, tasks, loading]);

  if (loading) {
    return (
      <div className="card text-center text-slate-500">Loading tasks...</div>
    );
  }

  return (
    <div className="card">
      <h2 className="font-bold text-lg mb-4">My Tasks</h2>

      {message && (
        <div className="mb-4">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task._id} className="p-4 bg-slate-50 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-1">{task.title}</h3>
            <p className="text-sm text-slate-600 mb-3">{task.description}</p>

            <select
              value={task.status}
              disabled={updatingId === task._id}
              onChange={(e) => updateStatus(task._id, e.target.value)}
              className="input text-sm bg-white"
            >
              <option value="Todo">Todo</option>
              <option value="Inprogress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

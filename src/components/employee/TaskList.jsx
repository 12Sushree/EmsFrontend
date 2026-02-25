import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, setPage } from "../../store/employee/employeeSlice";
import { updateTask } from "../../store/employee/employeeAPI";
import Alert from "../common/Alert";
import Select from "../common/Select";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Button from "../common/Button";

export default function TaskList() {
  const dispatch = useDispatch();
  const {
    tasks,
    taskLoading,
    error,
    page = 1,
    pages = 1,
  } = useSelector((state) => state.employee);

  const { control } = useForm({
    defaultValues: {
      tasks: [],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "tasks",
  });

  const statusOptions = [
    {
      value: "Todo",
      label: "Todo",
    },
    {
      value: "In Progress",
      label: "In Progress",
    },
    {
      value: "Done",
      label: "Completed",
    },
  ];

  const [alert, setAlert] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (tasks?.length) {
      replace(tasks || []);
    }
  }, [tasks, replace]);

  useEffect(() => {
    if (taskLoading) return;

    if (error) {
      setAlert((prev) =>
        prev?.message === error ? prev : { type: "error", message: error },
      );
      return;
    }

    if (tasks?.length === 0) {
      setAlert((prev) =>
        prev?.message === "No tasks found!"
          ? prev
          : { type: "info", message: "No tasks found!" },
      );
    }
  }, [taskLoading, error, tasks]);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  const handleStatusChange = async (taskId, value) => {
    try {
      setUpdatingId(taskId);
      await updateTask(taskId, { status: value });
      setAlert({ type: "success", message: "Status updated" });
      dispatch(fetchTasks(page));
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Update failed",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  if (taskLoading) {
    return (
      <div className="card text-center text-slate-500">Loading tasks.....</div>
    );
  }

  return (
    <div className="card">
      <h2 className="font-bold text-lg mb-4">My Tasks</h2>

      {alert && (
        <div className="mb-4">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {fields.map((task, index) => (
          <div key={task._id} className="p-4 bg-slate-50 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-1">{task.title}</h3>
            <p className="text-sm text-slate-600 mb-3">{task.description}</p>

            <Controller
              name={`tasks.${index}.status`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={statusOptions}
                  disabled={taskLoading || updatingId === task._id}
                  onChange={async (e) => {
                    const value = e.target.value;
                    field.onChange(value);
                    await handleStatusChange(task._id, value);
                  }}
                  className="text-sm bg-white"
                />
              )}
            />
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
          >
            ⬅ Prev
          </Button>

          <span className="text-sm font-semibold">
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

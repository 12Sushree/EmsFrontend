import { useEffect, useState } from "react";
import { assignTask } from "../../store/manager/managerAPI";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "../../store/manager/managerSlice";
import Alert from "../common/Alert";
import { Controller, useForm } from "react-hook-form";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import Select from "../common/Select";

function AssignTask() {
  const dispatch = useDispatch();
  const { team = [], loading, error } = useSelector((state) => state.manager);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
    },
  });
  const description = watch("description", "");

  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  useEffect(() => {
    if (error) setAlert({ type: "error", message: error });
  }, [error]);

  const employeeOptions = team.map((emp) => ({
    value: emp.id,
    label: `${emp.userName} (${emp.empId})`,
  }));

  const submit = async (data) => {
    try {
      setSubmitting(true);
      await assignTask({
        title: data.title.trim(),
        description: data.description.trim(),
        assignedTo: data.assignedTo,
      });
      setAlert({ type: "success", message: "Task Assigned!" });
      reset();
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to assign task",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-slate-500 text-sm">Loading team.....</p>;

  if (!loading && team.length === 0) {
    return (
      <div className="card text-center text-slate-500">
        Can't Assign Task, No Employees in Your Team Yet
      </div>
    );
  }

  return (
    <div className="card mb-6 max-w-lg">
      <h2 className="font-bold text-lg mb-4">Assign Task</h2>

      {alert && (
        <div className="mb-4">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <Input
            placeholder="Task Title"
            maxLength={100}
            {...register("title", {
              required: "Task title is required!",
              validate: (value) =>
                value.trim() !== "" || "Title can't be empty!",
              maxLength: {
                value: 100,
                message: "Task title can't exceed 100 characters!",
              },
            })}
          />
          {errors.title && (
            <span className="text-red-600">{errors.title.message}</span>
          )}
        </div>

        <div>
          <Textarea
            placeholder="Task Description"
            maxLength={2000}
            {...register("description", {
              required: "Task description is required!",
              validate: (value) =>
                value.trim() !== "" || "Description can't be empty!",
              maxLength: {
                value: 2000,
                message: "Maximum 2000 characters allowed!",
              },
            })}
          />
          <p className="flex justify-between">
            <span className="text-red-600">{errors.description?.message}</span>
            <span>{description.length} / 2000</span>
          </p>
        </div>

        <div>
          <Controller
            name="assignedTo"
            control={control}
            rules={{ required: "Assigned to is required!" }}
            render={({ field }) => (
              <Select
                {...field}
                options={employeeOptions}
                placeholder="Select Employee"
              />
            )}
          />
          {errors.assignedTo && (
            <span className="text-red-600">{errors.assignedTo.message}</span>
          )}
        </div>

        <Button
          type="submit"
          className="btn-primary btn-primary-glow w-full"
          disabled={submitting || !isValid}
        >
          {submitting ? "Assigning..." : "Assign"}
        </Button>
      </form>
    </div>
  );
}

export default AssignTask;

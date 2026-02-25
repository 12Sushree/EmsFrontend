import { useEffect, useState } from "react";
import { applyLeave } from "../../store/employee/employeeAPI";
import Alert from "../common/Alert";
import { useForm } from "react-hook-form";
import Input from "../common/Input";
import Button from "../common/Button";
import Textarea from "../common/Textarea";

function LeaveForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm();

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const fromDate = watch("from");
  const reason = watch("reason", "");

  const submit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        from: data.from,
        to: data.to,
        reason: data.reason,
      };
      await applyLeave(payload);

      setAlert({
        type: "success",
        message: "Leave applied successfully",
      });

      reset();
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to apply leave",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div className="card mb-6 max-w-lg">
      <h2 className="font-bold text-lg mb-4">Apply Leave</h2>

      {alert && (
        <div className="mb-4">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <Input
            type="date"
            min={today}
            {...register("from", {
              required: "From date is required!",
            })}
          />
          {errors.from && (
            <span className="text-red-600">{errors.from.message}</span>
          )}
        </div>

        <div>
          <Input
            type="date"
            min={fromDate || today}
            {...register("to", {
              required: "To date is required!",
              validate: (value) =>
                !fromDate ||
                value >= fromDate ||
                "End date can't be before start date!",
            })}
          />
          {errors.to && (
            <span className="text-red-600">{errors.to.message}</span>
          )}
        </div>

        <div>
          <Textarea
            placeholder="Reason"
            maxLength={2000}
            {...register("reason", {
              required: "Reason is required!",
              validate: (value) =>
                value.trim() !== "" || "Reason can't be empty!",
              maxLength: {
                value: 2000,
                message: "Maximum 2000 characters are allowed!",
              },
            })}
          />
          <p className="flex justify-between">
            <span className="text-red-600">{errors.reason?.message}</span>
            <span>{reason.length} / 2000</span>
          </p>
        </div>

        <Button
          type="submit"
          disabled={loading || !isValid}
          className="btn-primary btn-primary-glow w-full"
        >
          {loading ? "Applying..." : "Apply Leave"}
        </Button>
      </form>
    </div>
  );
}

export default LeaveForm;

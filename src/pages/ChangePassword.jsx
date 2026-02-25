import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { changePassword } from "../store/auth/profileAPI";
import Alert from "../components/common/Alert";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import DashboardLayout from "../components/common/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [alert, setAlert] = useState(null);
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      await changePassword(data);
      setAlert({
        type: "success",
        message: "Password Updated Successfully!",
      });
      reset();
      navigate("/profile");
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to change password",
      });
    }
  };

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <DashboardLayout>
      <PageHeader
        title="Change Password"
        subtitle="Update your account password securely"
      />

      <div className="card max-w-md mx-auto">
        {alert && (
          <div className="card">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="relative">
            <Input
              type={show.current ? "text" : "password"}
              placeholder="Current Password"
              {...register("currPwd", {
                required: "Enter current password!",
              })}
            />

            <Button
              type="button"
              onClick={() =>
                setShow((prev) => ({
                  ...prev,
                  current: !prev.current,
                }))
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 text-lg text-slate-500"
            >
              {show.current ? <FiEyeOff /> : <FiEye />}
            </Button>

            {errors.currPwd && (
              <span className="text-red-600">{errors.currPwd.message}</span>
            )}
          </div>

          <div className="relative">
            <Input
              type={show.new ? "text" : "password"}
              placeholder="New Password"
              {...register("newPwd", {
                required: "Enter new password!",
                minLength: {
                  value: 6,
                  message: "Password must contain at least 6 characters!",
                },
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{6,}$/.test(
                      value,
                    ) ||
                    "Password must include atleast one uppercase letter, lowercase letter, digit and special symbol!",
                  notSameAsOld: (value) =>
                    value !== watch("currPwd") ||
                    "New password must be different from current password!",
                },
              })}
            />

            <Button
              type="button"
              onClick={() =>
                setShow((prev) => ({
                  ...prev,
                  new: !prev.new,
                }))
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 text-lg text-slate-500"
            >
              {show.new ? <FiEyeOff /> : <FiEye />}
            </Button>

            {errors.newPwd && (
              <span className="text-red-600">{errors.newPwd.message}</span>
            )}
          </div>

          <div className="relative">
            <Input
              type={show.confirm ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("cnfPwd", {
                required: "Enter password to confirm!",
                validate: (value) =>
                  value === watch("newPwd") || "Passwords do not match!",
              })}
            />

            <Button
              type="button"
              onClick={() =>
                setShow((prev) => ({
                  ...prev,
                  confirm: !prev.confirm,
                }))
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 text-lg text-slate-500"
            >
              {show.confirm ? <FiEyeOff /> : <FiEye />}
            </Button>

            {errors.cnfPwd && (
              <span className="text-red-600">{errors.cnfPwd.message}</span>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary btn-primary-glow w-full"
          >
            {isSubmitting ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}

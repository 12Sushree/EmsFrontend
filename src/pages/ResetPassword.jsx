import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../store/auth/authAPI";
import Alert from "../components/common/Alert";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

export default function ResetPassword() {
  const [alert, setAlert] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const { token } = useParams();
  const [show, setShow] = useState({
    new: false,
    confirm: false,
  });

  const submit = async (data) => {
    try {
      const res = await resetPassword(token, data);
      setAlert({
        type: "success",
        message: res.data.message,
      });
      reset();
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to reset password!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-indigo-500 via-cyan-500 to-blue-500">
      <div className="card mb-6 w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

        {alert && (
          <div className="card">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="relative">
            <Input
              type={show.new ? "text" : "password"}
              autoComplete="off"
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
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

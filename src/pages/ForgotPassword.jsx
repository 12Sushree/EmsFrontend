import { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../store/auth/authAPI";
import Alert from "../components/common/Alert";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [alert, setAlert] = useState(null);

  const submit = async (data) => {
    try {
      const res = await forgotPassword(data);
      setAlert({
        type: "success",
        message: res.data.message,
      });
      reset();
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="card mb-6 w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>

        {alert && (
          <div className="card">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <Input
              type="email"
              autoComplete="email"
              placeholder="Enter Your Email"
              {...register("email", {
                required: "Email is required!",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Enter a valid Email Id",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary btn-primary-glow w-full"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </div>
  );
}

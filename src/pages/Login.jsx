import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/common/Alert";
import { useForm } from "react-hook-form";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [show, setShow] = useState({
    password: false,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [alert, setAlert] = useState(null);

  const submit = async (data) => {
    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      setAlert({
        type: "success",
        message: "Login successful! Redirecting...",
      });

      reset();
      navigate("/");
    }

    if (loginUser.rejected.match(result)) {
      setAlert({
        type: "error",
        message: result.payload || "Login failed",
      });
    }
  };

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="card mb-6 w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

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
              placeholder="Email"
              {...register("email", {
                required: "Please enter Email Id",
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

          <div className="relative">
            <Input
              type={show.password ? "text" : "password"}
              autoComplete="off"
              placeholder="Password"
              {...register("password", {
                required: "Enter password!",
              })}
            />

            <Button
              type="button"
              onClick={() =>
                setShow((prev) => ({
                  ...prev,
                  password: !prev.password,
                }))
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-lg text-slate-500"
            >
              {show.password ? <FiEyeOff /> : <FiEye />}
            </Button>

            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full btn-primary btn-primary-glow"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Link to="/forgot-password">Forgot Password?</Link>

        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

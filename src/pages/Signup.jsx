import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../store/auth/authSlice";
import Alert from "../components/common/Alert";
import { useForm } from "react-hook-form";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Button from "../components/common/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Signup() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [show, setShow] = useState({
    password: false,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const roleOptions = [
    {
      value: "Employee",
      label: "Employee",
    },
    {
      value: "Manager",
      label: "Manager",
    },
  ];

  const [alert, setAlert] = useState(null);

  const submit = async (data) => {
    const result = await dispatch(registerUser(data));

    if (registerUser.fulfilled.match(result)) {
      setAlert({
        type: "success",
        message: "Check your email for verification link!",
      });

      reset();
    }

    if (registerUser.rejected.match(result)) {
      setAlert({
        type: "error",
        message: result.payload || "Registration failed",
      });
    }
  };

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-indigo-500 via-cyan-500 to-blue-500">
      <div className="card mb-6 w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        {alert && (
          <div className="card">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <Input
              placeholder="Full Name"
              autoComplete="userName"
              {...register("userName", {
                required: "User Name is required",
                minLength: {
                  value: 5,
                  message: "At least 5 characters!",
                },
              })}
            />
            {errors.userName && (
              <span className="text-red-600">{errors.userName.message}</span>
            )}
          </div>

          <div>
            <Input
              type="email"
              autoComplete="email"
              placeholder="Email"
              {...register("email", {
                required: "Email Address is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email Address is not Valid",
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
                required: "Password is required",
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{6,}$/.test(
                      value,
                    ) ||
                    "Password must include atleast One Uppercase Letter, Lowercase Letter, Digit and Special Symbol!",
                },
                minLength: {
                  value: 6,
                  message: "Password must contain atleast 6 characters!",
                },
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
              className="absolute right-0 top-1/2 -translate-y-1/2 text-lg text-slate-500"
            >
              {show.password ? <FiEyeOff /> : <FiEye />}
            </Button>
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>

          <div>
            <Select
              options={roleOptions}
              {...register("role", {
                required: "Role is required",
              })}
            />
            {errors.role && (
              <span className="text-red-600">{errors.role.message}</span>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || isSubmitting}
            className="btn-primary btn-primary-glow w-full"
          >
            {isSubmitting ? "Signing up..." : "Signup"}
          </Button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

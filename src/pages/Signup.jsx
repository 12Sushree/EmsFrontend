import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";
import Alert from "../components/common/Alert";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    role: "Employee",
  });

  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(result)) {
      setMessage({
        type: "success",
        text: "Registration successful! Redirecting to login...",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    if (registerUser.rejected.match(result)) {
      setMessage({
        type: "error",
        text: result.payload || "Registration failed",
      });
    }
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-700">
      <div className="card mb-6 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        {message && (
          <div className="card">
            <Alert type={message.type} message={message.text} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.userName}
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
            className="input"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="input"
            required
          />

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="input"
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </select>

          <button
            disabled={loading}
            className="btn btn-primary btn-primary-glow w-full"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

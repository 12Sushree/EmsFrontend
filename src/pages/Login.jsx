import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/common/Alert";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(result)) {
      setMessage({
        type: "success",
        text: "Login successful! Redirecting...",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }

    if (loginUser.rejected.match(result)) {
      setMessage({
        type: "error",
        text: result.payload || "Login failed",
      });
    }
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="card mb-6 max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {message && (
          <div className="card">
            <Alert type={message.type} message={message.text} />
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
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

          <button
            disabled={loading}
            className="w-full btn btn-primary btn-primary-glow"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

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

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resendVerifyEmail, verifyEmail } from "../store/auth/authAPI";
import { useForm } from "react-hook-form";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("loading");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link!");
      return;
    }

    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        setStatus("success");
        setMessage(res.data.message);
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed!");
      }
    };
    verify();
  }, [token]);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  const handleResend = async (data) => {
    try {
      setLoading(true);
      const res = await resendVerifyEmail(data);
      setStatus("success");
      setMessage(res.data.message);
      reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err.response?.data?.message || "Failed to resend verification email!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-indigo-500 via-cyan-500 to-blue-500">
      <div className="card mb-6 w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">
          Email Verification
        </h2>

        {status === "loading" && (
          <p className="text-gray-600">Verifying Your Email...</p>
        )}

        {status === "success" && (
          <p className="text-green-600 font-semibold">
            {message}
            <br />
            Redirecting to login.....
          </p>
        )}

        {status === "error" && (
          <>
            <p className="text-red-600 mb-4">{message}</p>

            <p className="text-sm mb-3 text-gray-600">
              Enter Email to Resend Verification Link:
            </p>

            <form onSubmit={handleSubmit(handleResend)} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  {...register("email", {
                    required: "Email is required!",
                    validate: {
                      matchPattern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value,
                        ) || "Enter a valid Email Id",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="btn-primary btn-primary-glow w-full"
              >
                {loading ? "Sending..." : "Resend Verification Link"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/axios";
import { updateProfile } from "../store/auth/profileAPI";
import Alert from "../components/common/Alert";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/common/DashboardLayout";
import PageHeader from "../components/common/PageHeader";

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data.user);
        reset(res.data.user);
      } catch (err) {
        setAlert({
          type: "error",
          message: err.response?.data?.message || "Failed to load profile!",
        });
      }
    };
    fetchProfile();
  }, [reset]);

  const submit = async (data) => {
    try {
      const res = await updateProfile(data);

      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
      }

      setAlert({
        type: "success",
        message: "Profile Updated Successfully!",
      });

      navigate("/profile");
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Update failed!",
      });
    }
  };

  if (!user) {
    return (
      <div className="text-center text-slate-500 mt-10">
        Loading profile.....
      </div>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader title="Update Profile" subtitle="Update your profile" />
      <div className="card max-w-md mx-auto">
        {alert && (
          <div className="card">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <Input
            placeholder="Full Name"
            autoComplete="userName"
            {...register("userName", {
              minLength: {
                value: 5,
                message: "At least 5 characters!",
              },
            })}
          />
          {errors.userName && (
            <span className="text-red-600">{errors.userName.message}</span>
          )}

          <Input
            type="email"
            autoComplete="email"
            placeholder="Email"
            {...register("email", {
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Invalid email!",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}

          <Input
            placeholder="Phone Number"
            autoComplete="phone"
            {...register("phone", {
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number!",
              },
            })}
          />
          {errors.phone && (
            <span className="text-red-600">{errors.phone.message}</span>
          )}

          <Input type="date" {...register("dateOfJoining")} />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary btn-primary-glow w-full"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}

import { useState, useEffect } from "react";
import { createAnnouncement } from "../../store/manager/managerAPI";
import Alert from "../common/Alert";
import { useForm } from "react-hook-form";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";

export default function CreateAnnouncement() {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      message: "",
    },
  });

  const msg = watch("message", "");

  const submit = async (data) => {
    try {
      setLoading(true);
      await createAnnouncement({
        title: data.title.trim(),
        message: data.message.trim(),
      });
      setAlert({ type: "success", message: "Announcement posted!" });
      reset({
        title: "",
        message: "",
      });
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to post announcement",
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
      <h2 className="font-bold text-lg mb-4">Create Announcement</h2>

      {alert && (
        <div className="mb-4">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <Input
            placeholder="Title"
            maxLength={100}
            {...register("title", {
              required: "Announcement Title is required",
              validate: (value) =>
                value.trim() !== "" || "Title can't be empty!",
              maxLength: {
                value: 100,
                message: "Announcement Title can't exceed 100 Characters",
              },
            })}
          />
          {errors.title && (
            <span className="text-red-600">{errors.title.message}</span>
          )}
        </div>

        <div>
          <Textarea
            placeholder="Message"
            maxLength={2000}
            {...register("message", {
              required: "Announcement Message is required",
              validate: (value) =>
                value.trim() !== "" || "Message can't be empty!",
              maxLength: {
                value: 2000,
                message: "Maximum 2000 characters allowed",
              },
            })}
          />
          <p className="flex justify-between">
            <span className="text-red-600">{errors.message?.message}</span>
            <span className="text-xs text-slate-500">{msg.length} / 2000</span>
          </p>
        </div>

        <Button
          type="submit"
          className="btn-primary btn-primary-glow w-full"
          disabled={loading || !isValid}
        >
          {loading ? "Posting..." : "Post Announcement"}
        </Button>
      </form>
    </div>
  );
}

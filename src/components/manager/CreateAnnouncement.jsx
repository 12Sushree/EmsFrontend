import { useState, useEffect } from "react";
import { createAnnouncement } from "../../features/manager/managerAPI";
import Alert from "../common/Alert";

export default function CreateAnnouncement() {
  const [form, setForm] = useState({ title: "", message: "" });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createAnnouncement(form);
      setMessage({ type: "success", text: "Announcement posted!" });
      setForm({ title: "", message: "" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to post announcement",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="card mb-6 max-w-lg">
      <h2 className="font-bold text-lg mb-4">Create Announcement</h2>

      {message && (
        <div className="mb-4">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="input"
          required
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input"
          rows="3"
          required
        />

        <button
          type="submit"
          className="btn btn-primary btn-primary-glow w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Announcement"}
        </button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import Alert from "../common/Alert";

function ProfileCard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data.user);
      } catch (err) {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to load profile",
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  if (!user) return <p className="text-sm text-gray-500">Loading profile...</p>;

  return (
    <div className="card card-hover space-y-2">
      {message && (
        <div className="card">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <p>
        <strong>Name:</strong> {user.userName}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Role:</strong> {user.role}
      </p>

      {user.managerId && (
        <p>
          <strong>Manager:</strong> {user.managerId.userName}
        </p>
      )}
    </div>
  );
}

export default ProfileCard;

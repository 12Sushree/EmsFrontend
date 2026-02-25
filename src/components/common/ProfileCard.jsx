import { useEffect, useState } from "react";
import api from "../../services/axios";
import Alert from "../common/Alert";

function ProfileCard() {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data.user);
      } catch (err) {
        setAlert({
          type: "error",
          message: err.response?.data?.message || "Failed to load profile",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  if (!user) return <p className="text-sm text-gray-500">Loading profile...</p>;

  return (
    <div className="card card-hover space-y-2">
      {alert && (
        <div className="card">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      {loading && <p className="text-sm text-gray-500">Loading Profile.....</p>}

      {!loading && user && (
        <>
          <p>
            <strong>Employee ID:</strong> {user.empId}
          </p>

          <p>
            <strong>Name:</strong> {user.userName}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          {user.phone && (
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
          )}

          <p>
            <strong>Role:</strong> {user.role}
          </p>

          {user.designation && (
            <p>
              <strong>Designation:</strong> {user.designation}
            </p>
          )}

          <p>
            <strong>Status:</strong> {user.employmentStatus}
          </p>

          {user.reportingManager && (
            <p>
              <strong>Manager:</strong> {user.reportingManager.userName}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default ProfileCard;

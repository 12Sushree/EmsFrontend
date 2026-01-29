import React, { useEffect, useState } from "react";
import { getAnnouncements } from "../../features/employee/employeeAPI";
import Alert from "../common/Alert";

function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAnnouncements();
        setAnnouncements(res.data.data);

        if (res.data.data.length === 0) {
          setMessage({
            type: "info",
            text: "No announcements available",
          });
        }
      } catch (err) {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to load announcements",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="card">
      <h2 className="font-bold text-lg mb-4">Announcements</h2>

      {message && (
        <div className="card">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      {loading && (
        <p className="text-sm text-gray-500">Loading announcements...</p>
      )}

      {!loading && announcements.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="p-4 bg-slate-100 rounded-xl shadow"
            >
              <h3 className="font-semibold">{announcement.title}</h3>
              <p className="text-sm text-gray-600">{announcement.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                Posted by {announcement.createdBy.userName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnnouncementList;

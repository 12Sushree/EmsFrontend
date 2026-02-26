import { useEffect, useState } from "react";
import { getAnnouncements } from "../../store/employee/employeeAPI";
import Alert from "../common/Alert";
import Button from "./Button";

function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    setAlert(null);
    try {
      const res = await getAnnouncements(page);
      setAnnouncements(res.data.data);
      setTotalPages(Math.max(res.data.pages, 1));
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to load announcements",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [page]);

  useEffect(() => {
    if (!alert) return;

    const timer = setTimeout(() => {
      setAlert(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2>Announcements</h2>
        <Button onClick={fetchData}>⟳</Button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}

      {loading && (
        <p className="text-sm text-slate-500">Loading announcements...</p>
      )}

      {!loading && announcements.length === 0 && (
        <div className="text-sm text-slate-500 text-center py-6">
          No announcements available 📭
        </div>
      )}

      {!loading && announcements.length > 0 && (
        <div className="grid-auto">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="p-4 bg-slate-100 rounded-xl shadow card-hover"
            >
              <h3 className="font-semibold">{announcement.title}</h3>
              <p className="text-sm text-slate-600">{announcement.message}</p>
              <p className="text-xs text-slate-500 mt-2">
                Posted by {announcement.createdBy?.userName || "Admin"}
              </p>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            className="bg-slate-200 hover:bg-slate-300"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            ⬅ Prev
          </Button>

          <span className="text-sm font-semibold">
            Page {page} of {totalPages}
          </span>

          <Button
            className="bg-slate-200 hover:bg-slate-300"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next ➡
          </Button>
        </div>
      )}
    </div>
  );
}

export default AnnouncementList;

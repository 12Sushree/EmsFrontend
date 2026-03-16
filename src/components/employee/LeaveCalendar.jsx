import { useEffect, useState } from "react";
import { myLeaveCalendar } from "../../store/employee/employeeAPI";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Alert from "../common/Alert";
import Button from "../common/Button";

function LeaveCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const loadLeaves = async () => {
    try {
      const res = await myLeaveCalendar();
      const leaves = res.data.leaves || [];

      const formatted = leaves.map((leave) => ({
        title: `Leave (${leave.status})`,
        start: leave.from,
        end: new Date(new Date(leave.to).getTime() + 86400000),
        allDay: true,
        backgroundColor:
          leave.status === "Approved"
            ? "#22c55e"
            : leave.status === "Rejected"
              ? "#ef4444"
              : "#f59e0b",
        borderColor: "transparent",
        extendedProps: {
          reason: leave.reason,
          status: leave.status,
          from: leave.from,
          to: leave.to,
        },
      }));

      setEvents(formatted);

      const approved = leaves.filter(
        (leave) => leave.status === "Approved",
      ).length;
      const rejected = leaves.filter(
        (leave) => leave.status === "Rejected",
      ).length;
      const pending = leaves.filter(
        (leave) => leave.status === "Pending",
      ).length;

      setSummary({
        total: leaves.length,
        approved,
        pending,
        rejected,
      });
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to load",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setOpen(true);
  };

  const getLeaveDuration = () => {
    if (!selectedEvent) return 0;

    const from = new Date(selectedEvent.extendedProps.from);
    const to = new Date(selectedEvent.extendedProps.to);

    const diff = Math.round((to - from) / (1000 * 60 * 60 * 24) + 1);

    return diff;
  };

  if (loading) {
    return (
      <div className="card text-center text-slate-500">
        Loading Calendar.....
      </div>
    );
  }

  return (
    <div className="card">
      {alert && <Alert type={alert.type} message={alert.message} />}
      <h2 className="font-bold text-lg mb-4">My Leave Calendar</h2>

      <div className="grid-auto mb-6">
        <div className="col-span-3 bg-slate-100 rounded-lg p-4 text-center">
          <p className="text-sm text-slate-500">Total Leaves</p>
          <p className="text-xl font-bold text-slate-500">{summary.total}</p>
        </div>

        <div className="bg-green-100 rounded-lg p-4 text-center">
          <p className="text-sm text-green-500">Approved</p>
          <p className="text-xl font-bold text-green-500">{summary.approved}</p>
        </div>

        <div className="bg-yellow-100 rounded-lg p-4 text-center">
          <p className="text-sm text-yellow-500">Pending</p>
          <p className="text-xl font-bold text-yellow-500">{summary.pending}</p>
        </div>

        <div className="bg-red-100 rounded-lg p-4 text-center">
          <p className="text-sm text-red-500">Rejected</p>
          <p className="text-xl font-bold text-red-500">{summary.rejected}</p>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        eventClick={handleEventClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        dayMaxEvents={2}
        eventDisplay="block"
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
        }}
        eventMouseEnter={(info) => {
          info.el.title = info.event.extendedProps.reason || "Leave";
        }}
      />

      {open && selectedEvent && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-96 shadow-lg relative max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-center">
              Leave Details
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`
                  px-2 py-1 rounded text-white text-xs ${
                    selectedEvent.extendedProps.status === "Approved"
                      ? "bg-green-500"
                      : selectedEvent.extendedProps.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-amber-500"
                  }
                  `}
                >
                  {selectedEvent.extendedProps.status}
                </span>
              </p>

              <p>
                <span className="font-semibold">From:</span>{" "}
                {new Date(selectedEvent.extendedProps.from).toLocaleDateString(
                  "en-IN",
                )}
              </p>

              <p>
                <span className="font-semibold">To:</span>{" "}
                {new Date(selectedEvent.extendedProps.to).toLocaleDateString(
                  "en-IN",
                )}
              </p>

              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {getLeaveDuration()} day{getLeaveDuration() > 1 ? "s" : ""}
              </p>

              <p>
                <span className="font-semibold">Reason:</span>{" "}
                {selectedEvent.extendedProps.reason || "No reason provided"}
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <Button
                onClick={() => setOpen(false)}
                className="btn-secondary btn-secondary-glow w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaveCalendar;

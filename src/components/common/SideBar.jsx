import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth/authSlice";
import { useState } from "react";

export default function SideBar() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const logoutHandler = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg transition ${isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800 text-blue-100"}`;

  return (
    <>
      <header className="lg:hidden">
        <Button onClick={() => setIsOpen(true)} className="text-2xl mr-3">
          ☰
        </Button>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 w-64 min-h-screen bg-blue-900 text-white p-5 shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">EMS Portal</h2>

          <Button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-xl"
          >
            ✖
          </Button>
        </div>

        <nav className="flex-flex-col gap-2">
          <NavLink
            to="/"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/profile"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            My Profile
          </NavLink>

          {user?.role === "Employee" && (
            <>
              <NavLink
                to="/employee/leave"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Apply Leave
              </NavLink>

              <NavLink
                to="/employee/attendance"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Attendance History
              </NavLink>
            </>
          )}

          {user?.role === "Manager" && (
            <>
              <NavLink
                to="/manager/monitor"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Monitor Progress
              </NavLink>

              <NavLink
                to="/manager/add-emp"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Add Employee
              </NavLink>

              <NavLink
                to="/manager/announcement"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Announcements
              </NavLink>
            </>
          )}
        </nav>

        <div className="mt-10">
          <Button onClick={logoutHandler} className="btn-danger w-full">
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}

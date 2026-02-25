import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth/authSlice";

export default function SideBar() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    `p-2 rounded ${isActive ? "bg-blue-700" : "hover:bg-blue-700"}`;

  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-4">
      <h2 className="text-xl text-white font-bold mb-6">EMS Portal</h2>

      <nav className="flex flex-col gap-3">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          My Profile
        </NavLink>

        {user?.role === "Employee" && (
          <>
            <NavLink to="/employee/leave" className={linkClass}>
              Apply Leave
            </NavLink>

            <NavLink to="/employee/attendance" className={linkClass}>
              Attendance History
            </NavLink>
          </>
        )}

        {user?.role === "Manager" && (
          <>
            <NavLink to="/manager/monitor" className={linkClass}>
              Monitor Progress
            </NavLink>

            <NavLink to="/manager/add-emp" className={linkClass}>
              Add Employee
            </NavLink>

            <NavLink to="/manager/announcement" className={linkClass}>
              Announcements
            </NavLink>
          </>
        )}
      </nav>

      {user && (
        <div className="mt-10">
          <Button onClick={logoutHandler} className="btn-danger w-full">
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

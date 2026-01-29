import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export default function SideBar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-4">
      <h2 className="text-xl text-white font-bold mb-6">EMS Portal</h2>

      <nav className="flex flex-col gap-3">
        <Link to="/" className="hover:bg-blue-700 p-2 rounded">
          Dashboard
        </Link>

        <Link to="/profile" className="hover:bg-blue-700 p-2 rounded">
          My Profile
        </Link>

        {user?.role === "Employee" && (
          <>
            <Link to="/leave" className="hover:bg-blue-700 p-2 rounded">
              Apply Leave
            </Link>

            <Link to="/attendance" className="hover:bg-blue-700 p-2 rounded">
              Attendance History
            </Link>
          </>
        )}

        {user?.role === "Manager" && (
          <>
            <Link to="/monitor" className="hover:bg-blue-700 p-2 rounded">
              Monitor Progress
            </Link>

            <Link to="/add-emp" className="hover:bg-blue-700 p-2 rounded">
              Add Employee
            </Link>

            <Link to="/announcement" className="hover:bg-blue-700 p-2 rounded">
              Announcements
            </Link>
          </>
        )}
      </nav>

      {user && (
        <div className="mt-10">
          <button onClick={logoutHandler} className="btn btn-danger w-full">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/auth/authSlice";
import { Outlet } from "react-router-dom";
import { getAccessToken } from "./utils/token";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = getAccessToken();
    if (token && !user) dispatch(loadUser());
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading.....
      </div>
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;

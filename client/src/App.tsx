import React from "react";
import {
  Routes as Router,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

const PrivateRoutes = () => {
  const { token, user } = useAuth();
  if (!token || !user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const AppRoutes = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") as any);
    if (!token) navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  return (
    <Router>
      <Route
        path="/login"
        element={
          <React.Suspense fallback={<>...</>}>
            <Login />
          </React.Suspense>
        }
      />
      {/* <Route
        path="/signup"
        element={<React.Suspense fallback={<>...</>}>SignUp</React.Suspense>}
      /> */}
      {["/", "/client", "/client/:workId", "/client/:workId/:clientId"].map(
        (path) => (
          <Route element={<PrivateRoutes />}>
            <Route
              path={path}
              element={
                <React.Suspense fallback={<>...</>}>
                  <Chat />
                </React.Suspense>
              }
            />
          </Route>
        )
      )}
      {/* Wildcard route for undefined paths. Shows a 404 error */}
      <Route path="*" element={<p>404 Not found</p>} />
    </Router>
  );
};

const Login = React.lazy(() => import("./pages/Login"));
// const SignUp = React.lazy(() => import("../Pages/SignUp"));
const Chat = React.lazy(() => import("./pages/Chat"));
// const NotFound = React.lazy(() => import("../Pages/NotFound"));

export default AppRoutes;

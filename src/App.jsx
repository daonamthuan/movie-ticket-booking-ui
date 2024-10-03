import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "~/pages/Auth/Login";
import Dashboard from "~/pages/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "~/utils/authorizedAxios";
import AdminOverview from "./pages/Dashboard/Admin/AdminOverview/AdminOverview";
import AdminUserManagement from "./pages/Dashboard/Admin/AdminUserManagement/AdminUserManagement";
import AdminMovieManagement from "./pages/Dashboard/Admin/AdminMovieManagement/AdminMovieManagement";
import AdminBookingManagement from "./pages/Dashboard/Admin/AdminBookingManagement/AdminBookingManagement";
import AdminFoodManagement from "./pages/Dashboard/Admin/AdminFoodManagement/AdminFoodManagement";
import AdminScheduleManagement from "./pages/Dashboard/Admin/AdminScheduleManagement/AdminScheduleManagement";
import AdminCinemaManagement from "./pages/Dashboard/Admin/AdminCinemaManagement/AdminCinemaManagement";

const ProtectedRoutes = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) return <Navigate to="/login" replace={true} />;

    return <Outlet />;
};

const UnauthorizedRoutes = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) return <Navigate to="/dashboard" replace={true} />;

    return <Outlet />;
};

function App() {
    const navigate = useNavigate();

    // Inject navigate from React JSX into authorizedAxios.js
    setNavigate(navigate);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace={true} />} />

            <Route element={<UnauthorizedRoutes />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoutes />}>
                {/* <Outlet /> của react-router-dom sẽ chạy vào các Child Route trong này */}
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="overview" element={<AdminOverview />} />
                    <Route path="users" element={<AdminUserManagement />} />
                    <Route path="movies" element={<AdminMovieManagement />} />
                    <Route path="tickets" element={<AdminBookingManagement />} />
                    <Route path="schedules" element={<AdminScheduleManagement />} />
                    <Route path="foods" element={<AdminFoodManagement />} />
                    <Route path="cinemas" element={<AdminCinemaManagement />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;

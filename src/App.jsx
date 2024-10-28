import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "~/pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "~/pages/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "~/utils/authorizedAxios";
import HomePage from "./pages/User/HomePage/HomePage";
import MovieDetail from "./pages/User/MovieDetail/MovieDetail";
import SeatSelection from "./pages/User/SeatSelection/SeatSelection";
import FoodSelection from "./pages/User/FoodSelection/FoodSelection";
import PaymentSuccess from "./pages/User/Payment/PaymentSuccess";
import PaymentCancel from "./pages/User/Payment/PaymentCancel";
import BookingHistory from "./pages/User/BookingHistory/BookingHistory";
import StaffScheduleManagement from "./pages/Staff/StaffScheduleManagement/StaffScheduleManagement";
import AdminOverview from "./pages/Dashboard/Admin/AdminOverview/AdminOverview";
import AdminUserManagement from "./pages/Dashboard/Admin/AdminUserManagement/AdminUserManagement";
import AdminMovieManagement from "./pages/Dashboard/Admin/AdminMovieManagement/AdminMovieManagement";
import AdminBookingManagement from "./pages/Dashboard/Admin/AdminBookingManagement/AdminBookingManagement";
import AdminFoodManagement from "./pages/Dashboard/Admin/AdminFoodManagement/AdminFoodManagement";
import AdminScheduleManagement from "./pages/Dashboard/Admin/AdminScheduleManagement/AdminScheduleManagement";
import AdminCinemaManagement from "./pages/Dashboard/Admin/AdminCinemaManagement/AdminCinemaManagement";
import AdminRoomManagement from "./pages/Dashboard/Admin/AdminRoomManagement/AdminRoomManagement";
import AdminPromotionManagement from "./pages/Dashboard/Admin/AdminPromotionManagement/AdminPromotionManagement";

const AdminRoutes = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user || user.role !== "ADMIN") return <Navigate to="/login" replace={true} />;

    return <Outlet />;
};

const StaffRoutes = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user || user.role !== "STAFF") return <Navigate to="/login" replace={true} />;

    return <Outlet />;
};

const AuthorizedRoutes = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) return <Navigate to="/login" replace={true} />;

    return <Outlet />;
};

const UnauthorizedRoutes = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.role === "ADMIN") return <Navigate to="/dashboard" replace={true} />;
    if (user && user.role === "STAFF") return <Navigate to="/staff" replace={true} />;
    if (user && user.role === "CUSTOMER") return <Navigate to="/home" replace={true} />;

    return <Outlet />;
};

function App() {
    const navigate = useNavigate();
    // Inject navigate from React JSX into authorizedAxios.js
    setNavigate(navigate);

    return (
        <Routes>
            <Route element={<UnauthorizedRoutes />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/movie-detail/:movieId" element={<MovieDetail />} />

            {/* payment cancel, payment success route */}
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancel" element={<PaymentCancel />} />

            {/* Customer protected route */}
            <Route element={<UnauthorizedRoutes />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<AuthorizedRoutes />}>
                <Route path="/select-seat" element={<SeatSelection />} />
                <Route path="/select-food" element={<FoodSelection />} />
                <Route path="/booking-history" element={<BookingHistory />} />
            </Route>

            <Route element={<StaffRoutes />}>
                <Route path="/staff" element={<StaffScheduleManagement />} />
            </Route>

            <Route element={<AdminRoutes />}>
                {/* <Outlet /> của react-router-dom sẽ chạy vào các Child Route trong này */}
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="overview" element={<AdminOverview />} />
                    <Route path="schedules" element={<AdminScheduleManagement />} />
                    <Route path="users" element={<AdminUserManagement />} />
                    <Route path="movies" element={<AdminMovieManagement />} />
                    <Route path="bookings" element={<AdminBookingManagement />} />
                    <Route path="foods" element={<AdminFoodManagement />} />
                    <Route path="cinemas" element={<AdminCinemaManagement />} />
                    <Route path="rooms" element={<AdminRoomManagement />} />
                    <Route path="promotions" element={<AdminPromotionManagement />} />
                    <Route path="statistics" element={<AdminOverview />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;

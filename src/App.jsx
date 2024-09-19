import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "~/pages/Auth/Login";
import Dashboard from "~/pages/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "~/utils/authorizedAxios";

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
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Sau này sẽ còn nhiều Route nữa để ở đây ... */}
            </Route>
        </Routes>
    );
}

export default App;

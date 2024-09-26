import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import authorizedAxiosInstance from "~/utils/authorizedAxios";
import Sidebar from "./Sidebar/Sidebar";
import AdminOverview from "./Admin/AdminOverview/AdminOverview";
import AdminScheduleManagement from "./Admin/AdminScheduleManagement/AdminScheduleManagement";
import AdminBookingManagement from "./Admin/AdminBookingManagement/AdminBookingManagement";
import AdminMovieManagement from "./Admin/AdminMovieManagement/AdminMovieManagement";
import AdminFoodManagement from "./Admin/AdminFoodManagement/AdminFoodManagement";
import AdminUserManagement from "./Admin/AdminUserManagement/AdminUserManagement";
import Topbar from "./Topbar/Topbar";
import Box from "@mui/material/Box";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const res = await authorizedAxiosInstance.get(`/dashboards/access`);
            setUser(res.data);
        };
        fetchData();
    }, []);

    const handleListItemClick = (option) => {
        setSelectedOption(option);
    };

    const renderContent = () => {
        switch (selectedOption) {
            case "overview":
                return <AdminOverview />;
            case "schedules":
                return <AdminScheduleManagement />;
            case "tickets":
                return <AdminBookingManagement />;
            case "movies":
                return <AdminMovieManagement />;
            case "foods":
                return <AdminFoodManagement />;
            case "users":
                return <AdminUserManagement />;
            default:
                return <AdminUserManagement />;
        }
    };

    if (!user) {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    width: "100vw",
                    height: "100vh",
                }}
            >
                <CircularProgress />
                <Typography>Loading dashboard user...</Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Sidebar
                    selectedOption={selectedOption}
                    handleListItemClick={handleListItemClick}
                />
                <Box
                    sx={{
                        backgroundColor: "#FAFBFD",
                        px: 4,
                        py: 1,
                        width: "100%",
                    }}
                >
                    <Topbar />
                    {renderContent()}
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;

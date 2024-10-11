import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import authorizedAxiosInstance from "~/utils/authorizedAxios";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import Box from "@mui/material/Box";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [selectedOption, setSelectedOption] = useState("schedules");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await authorizedAxiosInstance.get(`/dashboards/access`);
            setUser(res.data);
        };
        fetchData();
        navigate("/dashboard/schedules");
    }, []);

    const handleListItemClick = (option) => {
        switch (option) {
            case "overview":
                navigate("/dashboard/overview");
                break;
            case "schedules":
                navigate("/dashboard/schedules");
                break;
            case "tickets":
                navigate("/dashboard/tickets");
                break;
            case "movies":
                navigate("/dashboard/movies");
                break;
            case "foods":
                navigate("/dashboard/foods");
                break;
            case "users":
                navigate("/dashboard/users");
                break;
            case "cinemas":
                navigate("/dashboard/cinemas");
                break;

            default:
                navigate("/dashboard/movies");
                break;
        }
        setSelectedOption(option);
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
            <Box sx={{ display: "flex", bgcolor: "#F8F8FA", gap: 4.5 }}>
                <Sidebar
                    selectedOption={selectedOption}
                    handleListItemClick={handleListItemClick}
                />
                <Box
                    sx={{
                        backgroundColor: "#F8F8FA",
                        px: 4,
                        py: 1,
                        width: "100%",
                    }}
                >
                    <Topbar />
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;

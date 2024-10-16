import { createTheme, ThemeProvider } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BadgeAvatars from "~/components/BadgeAvatar/BadgeAvatar";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import CineFastLogo from "~/assets/cinefast-logo.png";
import Box from "@mui/material/Box";

const listItemButtonTheme = createTheme({
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "#4b95df",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "primary.dark", // Màu nền khi hover và được chọn
                        },
                    },
                    "&:hover": {
                        backgroundColor: "grey.100", // Màu nền khi hover nhưng không được chọn
                    },
                },
            },
        },
    },
});

function Sidebar({ selectedOption, handleListItemClick }) {
    return (
        <Box
            sx={{
                width: 250,
                height: "100vh",
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "fixed",
                    bgcolor: "background.paper",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        width: "100%",
                        pt: 2,
                    }}
                >
                    <img src={CineFastLogo} style={{ width: "180px" }} />
                </Box>
                <List sx={{ minWidth: 250, flexGrow: 1, maxWidth: 350, px: 1.5 }} component="nav">
                    <ThemeProvider theme={listItemButtonTheme}>
                        <ListItemButton
                            selected={selectedOption === "overview"}
                            onClick={() => handleListItemClick("overview")}
                        >
                            <ListItemIcon>
                                <DataUsageOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Overview" />
                        </ListItemButton>

                        <ListItemButton
                            selected={selectedOption === "schedules"}
                            onClick={() => handleListItemClick("schedules")}
                        >
                            <ListItemIcon>
                                <CalendarMonthOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Schedules" />
                        </ListItemButton>

                        <ListItemButton
                            selected={selectedOption === "tickets"}
                            onClick={() => handleListItemClick("tickets")}
                        >
                            <ListItemIcon>
                                <BookOnlineOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tickets" />
                        </ListItemButton>

                        <ListItemButton
                            selected={selectedOption === "movies"}
                            onClick={() => handleListItemClick("movies")}
                        >
                            <ListItemIcon>
                                <LocalMoviesOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Movies" />
                        </ListItemButton>

                        <ListItemButton
                            selected={selectedOption === "foods"}
                            onClick={() => handleListItemClick("foods")}
                        >
                            <ListItemIcon>
                                <FastfoodOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Foods" />
                        </ListItemButton>

                        <ListItemButton
                            selected={selectedOption === "users"}
                            onClick={() => handleListItemClick("users")}
                        >
                            <ListItemIcon>
                                <PeopleAltOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItemButton>

                        <ListItemButton
                            selected={selectedOption === "cinemas"}
                            onClick={() => handleListItemClick("cinemas")}
                        >
                            <ListItemIcon>
                                <BusinessOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cinemas" />
                        </ListItemButton>

                        <ListItemButton
                            selected={selectedOption === "promotions"}
                            onClick={() => handleListItemClick("promotions")}
                        >
                            <ListItemIcon>
                                <DiscountOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Promotions" />
                        </ListItemButton>

                        <ListItemButton
                            selected={selectedOption === "statistics"}
                            onClick={() => handleListItemClick("statistics")}
                        >
                            <ListItemIcon>
                                <AssessmentOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Statistics" />
                        </ListItemButton>
                    </ThemeProvider>
                </List>

                <Box sx={{ pl: 2, pr: 1.5, py: 3 }}>
                    <BadgeAvatars />
                </Box>
            </Box>
        </Box>
    );
}

export default Sidebar;

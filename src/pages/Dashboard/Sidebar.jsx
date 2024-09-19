import { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import CinemaBookingLogo from "~/assets/cat-and-moon-logo.png";

function Sidebar() {
    const [open, setOpen] = useState({});

    const handleClick = (item) => {
        setOpen((prevState) => ({
            ...prevState,
            [item]: !prevState[item],
        }));
    };
    return (
        <Box sx={{ display: "flex", width: 250, height: "100vh", flexDirection: "column" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    bgcolor: "orange",
                    p: 1,
                }}
            >
                <img src={CinemaBookingLogo} width="80px" />
                <Typography>DASHBOARD</Typography>
            </Box>
            <List
                sx={{ minWidth: 250, flexGrow: 1, maxWidth: 350, bgcolor: "red", px: 1.5 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{ bgcolor: "green" }}
                    >
                        Nested List Items
                    </ListSubheader>
                }
            >
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleAltOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Overview" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <CalendarMonthOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Schedule" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <BookOnlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tickets" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <LocalMoviesOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Movie" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <FastfoodOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Food" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <PeopleAltOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Customer" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <BusinessOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cinema" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <DiscountOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Promotion" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <AssessmentOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Statistic" />
                </ListItemButton>
            </List>
        </Box>
    );
}

export default Sidebar;

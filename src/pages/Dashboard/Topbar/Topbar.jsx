import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "25px",
    border: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: "#ffffff",
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.5),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "300px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

function Topbar() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                height: "70px",
                borderRadius: "5px",
                py: 2,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: "28px",
                        fontWeight: 600,
                        color: "#005792",
                    }}
                >
                    DASHBOARD
                </Typography>
            </Box>

            <Box sx={{ display: "flex" }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                    />
                </Search>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={6} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={18} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <IconButton size="large" aria-label="setting icon" color="inherit">
                    <SettingsIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Topbar;

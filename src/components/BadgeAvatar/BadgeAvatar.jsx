import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AvatarSourceImage from "~/assets/avatar.jpg";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { handleLogoutAPI } from "~/apis";

const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px #fff`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));

export default function BadgeAvatars() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await handleLogoutAPI();
        localStorage.removeItem("userInfo");

        navigate("/login");
    };

    return (
        <Stack direction="row" spacing={0}>
            <Box>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                >
                    <Avatar alt="T" src={AvatarSourceImage} />
                </StyledBadge>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 1.75,
                    mr: 0.5,
                    minWidth: "130px",
                }}
            >
                <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "primary.main" }}>
                    Dao Nam Thuan
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Admin
                </Typography>
            </Box>

            <Box sx={{ m: 0 }}>
                <IconButton
                    type="button"
                    onClick={handleLogout}
                    sx={{
                        position: "relative",
                        top: 0,
                        right: 0,
                        px: "8px",
                        paddingTop: "3px",
                        paddingBottom: "16px",
                        width: "30px",
                    }}
                    color="primary"
                >
                    <LogoutIcon />
                </IconButton>
            </Box>
        </Stack>
    );
}

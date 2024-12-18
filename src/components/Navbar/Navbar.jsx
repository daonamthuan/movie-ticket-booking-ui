import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogoutAPI } from "~/apis";
import CineFastLogo from "~/assets/cinefast-logo.png";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Menu,
    MenuItem,
    IconButton,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

function Navbar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    let userInfo = localStorage.getItem("userInfo");

    const handleLogoClick = () => {
        navigate("/");
    };

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget); // Mở menu tại vị trí avatar
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register"); // Điều hướng đến /register
    };

    const handleClickBookingHistory = () => {
        navigate("/booking-history");
    };

    const handleLogout = async () => {
        await handleLogoutAPI();
        localStorage.removeItem("userInfo");

        navigate("/login");
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "white", color: "#333" }}>
            <Toolbar
                sx={{ maxWidth: "1280px", width: "100%", height: "70px", margin: "0 auto", px: 6 }}
            >
                <Box
                    sx={{ height: "70px", flexGrow: 1, cursor: "pointer" }}
                    onClick={handleLogoClick}
                >
                    <img src={CineFastLogo} style={{ height: "70px" }} />
                </Box>

                <Box>
                    <Button
                        color="inherit"
                        size="large"
                        sx={{ fontFamily: "Be Vietnam Pro", fontWeight: 500, color: "#333" }}
                    >
                        LỊCH CHIẾU
                    </Button>
                    <Button
                        color="inherit"
                        size="large"
                        sx={{ fontFamily: "Be Vietnam Pro", fontWeight: 500, color: "#333" }}
                    >
                        PHIM
                    </Button>
                    <Button
                        color="inherit"
                        size="large"
                        sx={{ fontFamily: "Be Vietnam Pro", fontWeight: 500, color: "#333" }}
                    >
                        CỤM RẠP
                    </Button>
                    <Button
                        color="inherit"
                        size="large"
                        sx={{ fontFamily: "Be Vietnam Pro", fontWeight: 500, color: "#333" }}
                    >
                        GIÁ VÉ
                    </Button>
                    <Button
                        color="inherit"
                        size="large"
                        sx={{ fontFamily: "Be Vietnam Pro", fontWeight: 500, color: "#333" }}
                    >
                        KHUYẾN MÃI
                    </Button>
                    {userInfo === null && (
                        <>
                            <Button
                                variant="contained"
                                sx={{ ml: 2, py: "5px" }}
                                onClick={handleLogin}
                            >
                                Đăng nhập
                            </Button>
                            <Button variant="outlined" sx={{ mx: 1 }} onClick={handleRegister}>
                                Đăng ký
                            </Button>
                        </>
                    )}
                </Box>
                {userInfo && (
                    <Box sx={{ ml: 1 }}>
                        <IconButton onClick={handleAvatarClick}>
                            <Avatar
                                alt={userInfo.firstName}
                                src={
                                    "https://res.cloudinary.com/dquwkvuyh/image/upload/v1728918684/ope6mxxzxwue8mtkzber.jpg"
                                }
                                sx={{ border: "1px solid #9d9d9d" }}
                            />
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl} // Đặt menu tại vị trí avatar
                            open={Boolean(anchorEl)} // Menu mở khi anchorEl có giá trị
                            onClose={handleClose} // Đóng menu khi click ra ngoài
                        >
                            <MenuItem onClick={handleClickBookingHistory}>Lịch sử mua vé</MenuItem>
                            <MenuItem onClick={handleClose}>Thông tin cá nhân</MenuItem>
                            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;

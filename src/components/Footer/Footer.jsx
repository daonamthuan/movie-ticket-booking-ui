import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ArrowRight } from "@mui/icons-material";

function Footer() {
    return (
        <>
            <Box sx={{ bgcolor: "#337ab7", pt: 4, pb: 1, color: "#fff" }}>
                <Container sx={{ maxWidth: "1280px", px: "0 !important", color: "white", mb: 3.5 }}>
                    <Grid container columnSpacing={5}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography
                                variant="h6"
                                sx={{ fontSize: "18px", fontWeight: 500, pb: 1 }}
                            >
                                GIỚI THIỆU
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Chúng tôi là đơn vị cung cấp dịch vụ đặt vé xem phim trực tuyến hàng
                                đầu, mang đến trải nghiệm dịch vụ tốt nhất và nhanh nhất thị trường
                                cho người dùng.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                variant="h6"
                                sx={{ fontSize: "18px", fontWeight: 500, pb: 1, pl: 0.5 }}
                            >
                                QUY ĐỊNH & ĐIỀU KHOẢN
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                Quy định thành viên
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                Điều khoản
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                Hướng dẫn đặt vé trực tuyến
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                Quy định và chính sách chung
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                Chính sách bảo vệ thông tin cá nhân của người tiêu dùng
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography
                                variant="h6"
                                sx={{ fontSize: "18px", fontWeight: 500, pb: 1, pl: 0.5 }}
                            >
                                HỖ TRỢ
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                Góp ý
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                Sale & Services
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                Rạp / Giá vé
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                Tuyển dụng
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                FAQ
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Typography
                                variant="h6"
                                sx={{ fontSize: "18px", fontWeight: 500, pb: 1, pl: 0.5 }}
                            >
                                LIÊN HỆ
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                Địa chỉ: 242 Phạm Văn Đồng, Thành phố, Thủ Đức, Hồ Chí Minh.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                Email: lienhe@example.com
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                                <ArrowRight
                                    sx={{ position: "relative", bottom: "-5px", left: "-5px" }}
                                />
                                SĐT: 0123 456 789
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
                <Box
                    sx={{
                        width: "100%",
                        bgColor: "red !important",
                        textAlign: "center",
                    }}
                >
                    &copy; 2024 Dao Nam Thuan. More information? <span></span>
                    <a href="https://github.com/daonamthuan" target="_blank">
                        Visit my GitHub.
                    </a>
                </Box>
            </Box>
        </>
    );
}

export default Footer;

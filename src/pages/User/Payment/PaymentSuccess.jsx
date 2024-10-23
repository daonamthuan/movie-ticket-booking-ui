import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { updatePaymentSuccessAPI } from "~/apis";
import PaymentSuccessImage from "~/assets/payment_success.gif";
import { Box, Typography, Button } from "@mui/material";

const PaymentSuccess = () => {
    const location = useLocation();

    // Sử dụng URLSearchParams để phân tích query parameters
    const queryParams = new URLSearchParams(location.search);

    // Lấy các giá trị của query parameters
    const cancel = queryParams.get("cancel");
    const status = queryParams.get("status");
    const orderCode = queryParams.get("orderCode");

    useEffect(() => {
        const updatePaymentSuccess = async () => {
            if (cancel === "false" && status === "PAID") {
                await updatePaymentSuccessAPI(orderCode);
            }
        };
        updatePaymentSuccess();
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            textAlign="center"
            p={3}
        >
            <Box sx={{ width: "200px", bgcolor: "white", margin: "5px auto 0" }}>
                <img src={PaymentSuccessImage} width="100%" />
            </Box>
            <Typography variant="h3" color="primary" gutterBottom>
                Thanh toán thành công!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Cảm ơn bạn đã đặt vé. Chúng tôi đã nhận được thanh toán của bạn!
            </Typography>
            <Box my={2}>
                <Button variant="contained" color="primary" component={Link} to="/">
                    Quay lại Trang chủ
                </Button>
            </Box>
            <Box mb={5}>
                <Button variant="outlined" color="secondary" component={Link} to="/booking-history">
                    Xem Lịch sử Đặt vé
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentSuccess;

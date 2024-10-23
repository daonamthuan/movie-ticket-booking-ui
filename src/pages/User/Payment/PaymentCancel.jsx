import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { updatePaymentCancelledAPI } from "~/apis";
import PaymentCancelImage from "~/assets/payment_cancel.gif";
import { Box, Typography, Button } from "@mui/material";

const PaymentCancel = () => {
    const location = useLocation();

    // Sử dụng URLSearchParams để phân tích query parameters
    const queryParams = new URLSearchParams(location.search);

    // Lấy các giá trị của query parameters
    const cancel = queryParams.get("cancel");
    const status = queryParams.get("status");
    const orderCode = queryParams.get("orderCode");

    useEffect(() => {
        const updatePaymentCancelled = async () => {
            if (cancel === "true" && status === "CANCELLED") {
                await updatePaymentCancelledAPI(orderCode);
            }
        };
        updatePaymentCancelled();
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
            <Box sx={{ width: "200px", bgcolor: "white", margin: "5px auto 20px" }}>
                <img src={PaymentCancelImage} width="100%" />
            </Box>
            <Typography variant="h3" color="error" gutterBottom>
                Thanh toán thất bại!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Rất tiếc, quá trình thanh toán của bạn không thành công. Vui lòng thử lại!
            </Typography>
            <Box mt={2.5} mb={6}>
                <Button variant="contained" color="primary" component={Link} to="/">
                    Quay lại Trang chủ
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentCancel;

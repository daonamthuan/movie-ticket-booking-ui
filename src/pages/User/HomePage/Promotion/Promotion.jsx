import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PromotionSlider from "./PromotionSlider";

function Promotion() {
    const promotions = [
        {
            title: "Thứ 2 Đầu Tháng - Đỉnh Nóc Kịch Trần Chỉ 45K",
            image: "https://res.cloudinary.com/dquwkvuyh/image/upload/v1728831214/d7savnwdm3gqvkexf4rk.jpg",
        },
        {
            title: "Bánh Phồng Rắc Rắc - Chỉ Từ 25K",
            image: "https://res.cloudinary.com/dquwkvuyh/image/upload/v1728831150/o8upsvib1jdrentkuhqw.jpg",
        },
        {
            title: "Thứ Ba Vui Vẻ - Đồng Giá 50K",
            image: "https://res.cloudinary.com/dquwkvuyh/image/upload/v1728831274/ted3w5iqobbvazkxe7pm.jpg",
        },
        {
            title: "U22 Học Sinh Sinh Viên Đồng Giá 45K",
            image: "https://res.cloudinary.com/dquwkvuyh/image/upload/v1728831330/ymsmwn06c79w7caq8hep.jpg",
        },
        {
            title: "Nhập Mã VNPAYFASTCINE - GIẢM NGAY 20K",
            image: "https://res.cloudinary.com/dquwkvuyh/image/upload/v1728831366/ycfcvkpsmmcacztuzj33.jpg",
        },
        {
            title: "Voucher ShopeePay Dành Cho Bạn Mới - SPPCINE10",
            image: "https://res.cloudinary.com/dquwkvuyh/image/upload/v1728831462/txrcuissn5cpo0km7ruc.jpg",
        },
    ];

    return (
        <Box
            sx={{
                maxWidth: "1280px",
                width: "100%",
                py: 3,
            }}
        >
            <Typography
                sx={{
                    fontSize: "28px",
                    fontWeight: 600,
                    fontFamily: "Be Vietnam Pro",
                    textAlign: "center",
                    my: 2,
                    color: "#337ab7",
                }}
            >
                CHƯƠNG TRÌNH KHUYẾN MÃI
            </Typography>
            <PromotionSlider promotions={promotions} />
        </Box>
    );
}

export default Promotion;

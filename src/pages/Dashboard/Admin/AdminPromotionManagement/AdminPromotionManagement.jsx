import { useState, useEffect } from "react";
import { fetchAllVouchersAPI } from "~/apis";
import VoucherModal from "./VoucherModal";
import VoucherTable from "./VoucherTable";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

function AdminPromotionManagement() {
    const [vouchers, setVouchers] = useState([]);
    const [isOpenVoucherModal, setIsOpenVoucherModal] = useState(false);

    useEffect(() => {
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        let response = await fetchAllVouchersAPI();
        setVouchers(response.data);
    };

    const handleFetchVouchers = () => {
        fetchVouchers();
    };

    const handleOpenVoucherModal = () => {
        setIsOpenVoucherModal(true);
    };

    return (
        <>
            <Box sx={{ bgcolor: "background.paper", p: "20px 30px", borderRadius: "20px" }}>
                <Typography
                    sx={{
                        mb: 1.5,
                        fontSize: "18px",
                        fontWeight: 600,
                        textAlign: "center",
                        color: "#005792",
                    }}
                >
                    QUẢN LÝ MÃ GIẢM GIÁ
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 3 }}>
                        <Button
                            onClick={handleOpenVoucherModal}
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            sx={{
                                width: "180px",
                                px: 0.5,
                                fontSize: "14px",
                                textTransform: "none",
                            }}
                        >
                            Thêm mã giảm giá
                        </Button>
                    </Box>
                    <Box>
                        <VoucherTable
                            vouchers={vouchers}
                            setIsOpenVoucherModal={setIsOpenVoucherModal}
                            handleFetchVouchers={handleFetchVouchers}
                        />
                    </Box>
                </Box>
            </Box>
            <VoucherModal
                isOpenVoucherModal={isOpenVoucherModal}
                setIsOpenVoucherModal={setIsOpenVoucherModal}
                handleFetchVouchers={handleFetchVouchers}
            />
        </>
    );
}

export default AdminPromotionManagement;

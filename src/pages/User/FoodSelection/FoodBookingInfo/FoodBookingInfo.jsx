import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { formatVND } from "~/utils/helper";
import { getVoucherAPI, createPaymentLinkAPI, updateBookingAPI } from "~/apis";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import dayjs from "dayjs";
import _ from "lodash";

function FoodBookingInfo({ schedule, room, movie, selectedSeats, selectedFoods }) {
    const navigate = useNavigate();
    const [voucher, setVoucher] = useState(null);
    const [voucherMessage, setVoucherMessage] = useState("");
    const voucherRef = useRef("");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let voucherAmount = 0;

    const handleClickSubmit = async () => {
        try {
            console.log("Check submit: ", schedule, selectedSeats, selectedFoods, voucher);
            const response = await createPaymentLinkAPI();
            const paymentUrl = response.data.url;
            const bookingId = response.data.orderCode;

            if (paymentUrl) {
                if (voucher !== null) {
                    voucherAmount = voucher.amount;
                }
                const totalSeatAmount = selectedSeats.reduce(
                    (total, item) => total + (item.type === 1 ? 60000 : 75000),
                    0
                );
                const totalFoodAmount = selectedFoods.reduce(
                    (total, item) => total + item.food.price * item.quantity,
                    0
                );

                const bookingData = {
                    id: bookingId,
                    userId: userInfo.id,
                    scheduleId: schedule.id,
                    totalSeatAmount: totalSeatAmount,
                    totalFoodAmount: totalFoodAmount,
                    subtotal: totalSeatAmount + totalFoodAmount,
                    voucherId: voucher?.id,
                    voucherAmount: voucherAmount,
                    total:
                        voucherAmount >= 1
                            ? totalSeatAmount + totalFoodAmount - voucherAmount
                            : (totalSeatAmount + totalFoodAmount) * (1 - voucherAmount),
                    payment: "BANKING",
                    status: "PENDING",
                };

                const data = {
                    bookingId: bookingId,
                    bookingData: bookingData,
                    selectedSeats: selectedSeats,
                    selectedFoods: selectedFoods,
                };

                console.log("Check data info booking: ", data);
                let responseUpdate = await updateBookingAPI(data);

                if (responseUpdate.status === 200) {
                    console.log("Update booking successfully");

                    // Chuyển hướng tới trang thanh toán
                    window.location.href = paymentUrl;
                }
            }
        } catch (err) {
            console.log("Error creating payment link: ", err);
        }
    };

    const renderNormalSeatText = () => {
        if (selectedSeats && selectedSeats.length > 0) {
            let seats = selectedSeats
                .filter((seat) => seat.type === 1)
                .sort((a, b) => (a.seatName > b.seatName ? 1 : -1));

            if (seats.length > 0) {
                return (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 0.5 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontFamily: "Be Vietnam Pro",
                                }}
                            >
                                {`${seats.length} x Vé ghế thường 2D`}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    fontFamily: "Be Vietnam Pro",
                                    color: "#337ab7",
                                }}
                            >
                                {seats.map((seat, index) =>
                                    index === 0 ? `${seat.seatName}` : `, ${seat.seatName}`
                                )}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontFamily: "Be Vietnam Pro",
                                }}
                            >
                                {formatVND(seats.length * 60000)}
                            </Typography>
                        </Box>
                    </Box>
                );
            }
        }
    };

    const renderCoupleSeatText = () => {
        if (selectedSeats && selectedSeats.length > 0) {
            let seats = selectedSeats
                .filter((seat) => seat.type === 2)
                .sort((a, b) => (a.seatName > b.seatName ? 1 : -1));

            if (seats.length > 0) {
                return (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 0.5 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontFamily: "Be Vietnam Pro",
                                }}
                            >
                                {`${seats.length} x Vé ghế đôi 2D`}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    fontFamily: "Be Vietnam Pro",
                                    color: "#337ab7",
                                }}
                            >
                                {seats.map((seat, index) =>
                                    index === 0 ? `${seat.seatName}` : `, ${seat.seatName}`
                                )}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontFamily: "Be Vietnam Pro",
                                }}
                            >
                                {formatVND(seats.length * 75000)}
                            </Typography>
                        </Box>
                    </Box>
                );
            }
        }
    };

    const renderFoodBooking = () => {
        if (selectedFoods && selectedFoods.length > 0) {
            return (
                <Box sx={{ mb: 2 }}>
                    <Box
                        component="hr"
                        sx={{
                            border: "none",
                            borderTop: "1px dashed #000",
                            my: 1,
                        }}
                    />
                    {selectedFoods.map((selectedFood, index) => (
                        <Box
                            key={index} // Đảm bảo thêm key cho mỗi phần tử trong map
                            sx={{ display: "flex", alignItems: "center", gap: 2, py: "6px" }}
                        >
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontFamily: "Be Vietnam Pro",
                                    }}
                                >
                                    {`${selectedFood.quantity} x ${selectedFood.food.foodName}`}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontFamily: "Be Vietnam Pro",
                                    }}
                                >
                                    {formatVND(selectedFood.food.price * selectedFood.quantity)}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            );
        }
    };

    const renderTotalAmount = () => {
        let normalSeatAmount = selectedSeats.filter((seat) => seat.type === 1).length * 60000;
        let coupleSeatAmount = selectedSeats.filter((seat) => seat.type === 2).length * 75000;
        let totalFoodAmount = selectedFoods.reduce(
            (total, item) => total + item.food.price * item.quantity,
            0
        );

        if (selectedSeats && selectedSeats.length > 0) {
            return (
                <>
                    <hr></hr>
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: "18px",
                                fontFamily: "Be VietNam Pro",
                                fontWeight: 500,
                                color: "#333",
                                mt: 1,
                                mb: 0.5,
                            }}
                        >
                            Tổng tiền:
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: "18px",
                                fontFamily: "Be VietNam Pro",
                                fontWeight: 600,
                                color: "#337ab7",
                                mt: 1,
                                mb: 0.5,
                            }}
                        >
                            {voucher === null
                                ? formatVND(normalSeatAmount + coupleSeatAmount + totalFoodAmount)
                                : voucher.amount < 1
                                ? formatVND(
                                      (normalSeatAmount + coupleSeatAmount + totalFoodAmount) *
                                          voucher.amount
                                  )
                                : formatVND(
                                      normalSeatAmount +
                                          coupleSeatAmount +
                                          totalFoodAmount -
                                          voucher.amount
                                  )}
                        </Typography>
                    </Box>
                </>
            );
        }
    };

    const handleApplyVoucher = async () => {
        let voucherResponse = await getVoucherAPI(voucherRef.current.value);
        let voucher = voucherResponse.data;
        if (voucher === null || voucher.status === "USED") {
            setVoucherMessage("Voucher không tồn tại hoặc đã được sử dụng!");
        } else {
            if (voucher.amount < 1) {
                setVoucherMessage(`Áp mã thành công! Bạn được giảm ${voucher.amount * 100}%.`);
            } else {
                setVoucherMessage(`Áp mã thành công! Bạn được giảm ${formatVND(voucher.amount)}.`);
            }
            setVoucher(voucherResponse.data);
        }
    };

    return (
        <Box
            sx={{
                alignSelf: "flex-start",
                width: "30%",
                borderRadius: "15px",
                border: "1px solid #bbbbbb",
                p: "20px",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    fontFamily: "Be Vietnam Pro",
                    color: "#337ab7",
                    mb: 1,
                }}
            >
                <PlaceOutlinedIcon
                    sx={{
                        position: "relative",
                        bottom: "-5px",
                        color: "#337ab7",
                        mr: "5px",
                    }}
                />
                {room.cinema.cinemaName}
            </Typography>
            <Typography
                sx={{
                    fontSize: "15px",
                    mb: 2,
                    fontFamily: "Be Vietnam Pro",
                }}
            >
                {`${room.roomName} - ${dayjs(schedule.startTime).format(
                    "DD/MM/YYYY"
                )} - Suất: ${dayjs(schedule.startTime).format("HH:mm")}`}
            </Typography>

            <hr></hr>
            <Typography
                variant="h5"
                sx={{
                    fontSize: "18px",
                    fontFamily: "Be VietNam Pro",
                    fontWeight: 600,
                    color: "#337ab7",
                    mt: 2,
                    mb: 0.5,
                }}
            >
                {movie.movieName}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
                <Typography
                    variant="h5"
                    sx={{
                        width: "50px",
                        textAlign: "center",
                        fontSize: "13px",
                        fontFamily: "Be VietNam Pro",
                        fontWeight: 600,
                        p: "3px 6px",
                        color: "#fff",
                        borderRadius: "5px",
                        background:
                            "linear-gradient(0deg, rgba(238, 0, 0, 1) 0%, rgba(198, 63, 63, 1) 50%, rgba(182, 92, 72, 1) 100%)",
                    }}
                >
                    {movie.ageLimit}
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        maxWidth: "200px",
                        width: "100px",
                        textAlign: "center",
                        fontSize: "13px",
                        fontFamily: "Be VietNam Pro",
                        fontWeight: 600,
                        p: "3px 6px",
                        color: "#fff",
                        borderRadius: "5px",
                        background: "#333",
                    }}
                >
                    {movie.audioType === "both"
                        ? "Thuyết minh, Phụ đề"
                        : movie.audioType === "subtitled"
                        ? "Thuyết minh"
                        : "Phụ đề"}
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        width: "50px",
                        textAlign: "center",
                        fontSize: "13px",
                        fontFamily: "Be VietNam Pro",
                        fontWeight: 600,
                        p: "3px 6px",
                        color: "#fff",
                        borderRadius: "5px",
                        background:
                            "linear-gradient(0deg, rgba(0,185,18,1) 0%, rgba(80,182,72,1) 50%)",
                    }}
                >
                    {movie.movieFormat}
                </Typography>
            </Box>

            {renderNormalSeatText()}
            {renderCoupleSeatText()}

            {renderFoodBooking()}

            {renderTotalAmount()}

            <hr />
            <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                    Chọn phương thức thanh toán
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio />} label="QR Banking" />
                </RadioGroup>
            </FormControl>

            {/* Nhap ma giam gia */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}>
                <TextField
                    label="Nhập mã voucher"
                    variant="outlined"
                    size="small"
                    sx={{ width: "70%" }}
                    inputRef={voucherRef}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleApplyVoucher}
                    sx={{ flexGrow: 1, px: "5px", py: "8px" }}
                >
                    ÁP DỤNG
                </Button>
            </Box>
            <Typography sx={{ color: voucherMessage.includes("thành công") ? "green" : "red" }}>
                {voucherMessage}
            </Typography>

            <Button
                size="large"
                variant="contained"
                sx={{ width: "100%", my: 2 }}
                onClick={handleClickSubmit}
            >
                THANH TOÁN
            </Button>
        </Box>
    );
}

export default FoodBookingInfo;

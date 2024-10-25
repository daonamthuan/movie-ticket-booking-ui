import { useState } from "react";
import { formatVND } from "~/utils/helper";
import QRCode from "react-qr-code";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import dayjs from "dayjs";

const styleTicketModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    outline: "none",
    borderRadius: "20px",
    boxShadow: 24,
    py: 3,
    px: 2.5,
};

function TicketInfoModal({ isOpenTicketModal, handleCloseTicketModal, ticket }) {
    const renderNormalSeatText = () => {
        if (ticket) {
            if (ticket.seatBookings && ticket.seatBookings.length > 0) {
                let seats = ticket.seatBookings
                    .filter((seat) => seat.seatType === 1)
                    .sort((a, b) => (a.seatName > b.seatName ? 1 : -1));

                if (seats.length > 0) {
                    return (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
        }
    };

    const renderCoupleSeatText = () => {
        if (ticket) {
            if (ticket.seatBookings && ticket.seatBookings.length > 0) {
                let seats = ticket.seatBookings
                    .filter((seat) => seat.seatType === 2)
                    .sort((a, b) => (a.seatName > b.seatName ? 1 : -1));

                if (seats.length > 0) {
                    return (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
        }
    };

    const renderFoodBooking = () => {
        if (ticket && ticket.foodBookings && ticket.foodBookings.length > 0) {
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
                    {ticket.foodBookings.map((food, index) => (
                        <Box
                            key={index} // Đảm bảo thêm key cho mỗi phần tử trong map
                            sx={{ display: "flex", alignItems: "center", gap: 2, py: "3px" }}
                        >
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontFamily: "Be Vietnam Pro",
                                    }}
                                >
                                    {`${food.quantity} x ${food.foodInfo.foodName}`}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontFamily: "Be Vietnam Pro",
                                    }}
                                >
                                    {formatVND(food.foodInfo.price * food.quantity)}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            );
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpenTicketModal}
            onClose={handleCloseTicketModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpenTicketModal}>
                <Box sx={styleTicketModal}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseTicketModal}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            color: "grey.500",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box
                        sx={{
                            alignSelf: "flex-start",
                            width: "100%",
                            borderRadius: "15px",
                            border: "1px solid #bbbbbb",
                            px: "20px",
                            py: "10px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "18px",
                                fontWeight: 600,
                                fontFamily: "Be Vietnam Pro",
                                color: "#337ab7",
                                mb: 0.5,
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
                            {ticket?.schedule?.room?.cinema?.cinemaName}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "15px",
                                mb: 1,
                                fontFamily: "Be Vietnam Pro",
                            }}
                        >
                            {`${ticket?.schedule?.room?.roomName} - ${dayjs(
                                ticket?.schedule?.startTime
                            ).format("DD/MM/YYYY")} - Suất: ${dayjs(
                                ticket?.schedule?.startTime
                            ).format("HH:mm")}`}
                        </Typography>

                        <hr></hr>
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
                            {ticket?.schedule?.movie?.movieName}
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
                                {ticket?.schedule?.movie?.ageLimit}
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
                                {ticket?.schedule?.movie?.audioType === "both"
                                    ? "Thuyết minh, Phụ đề"
                                    : ticket?.schedule?.movie?.audioType === "subtitled"
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
                                {ticket?.schedule?.movie?.movieFormat}
                            </Typography>
                        </Box>

                        {renderNormalSeatText()}

                        {renderCoupleSeatText()}

                        {renderFoodBooking()}

                        <hr></hr>
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: "15px",
                                    fontFamily: "Be VietNam Pro",
                                    fontWeight: 500,
                                    color: "#333",
                                    my: 0.5,
                                }}
                            >
                                Tạm tính:
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: "15px",
                                    fontFamily: "Be VietNam Pro",
                                    fontWeight: 600,
                                    color: "#337ab7",
                                    my: 0.5,
                                }}
                            >
                                {ticket ? formatVND(ticket.subtotal) : ""}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: "15px",
                                    fontFamily: "Be VietNam Pro",
                                    fontWeight: 500,
                                    color: "#333",
                                }}
                            >
                                Giảm giá:
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: "15px",
                                    fontFamily: "Be VietNam Pro",
                                    fontWeight: 600,
                                    color: "#337ab7",
                                }}
                            >
                                {ticket ? formatVND(ticket.voucherAmount) : ""}
                            </Typography>
                        </Box>
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
                                {ticket ? formatVND(ticket.total) : ""}
                            </Typography>
                        </Box>
                        <hr />
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                justifyContent: "space-between",
                                alignItems: "center",
                                my: 1.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontFamily: "Be Vietnam Pro",
                                }}
                            >
                                Phương thức thanh toán:
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: "15px",
                                    fontFamily: "Be VietNam Pro",
                                    fontWeight: 600,
                                    color: "#337ab7",
                                }}
                            >
                                {`${ticket?.payment}`}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                            <QRCode
                                value={`booking${ticket?.id}`}
                                style={{ height: "auto", maxWidth: "100%", width: "100px" }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default TicketInfoModal;

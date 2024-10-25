import { useNavigate } from "react-router-dom";
import { formatVND } from "~/utils/helper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import dayjs from "dayjs";

function SeatBookingInfo({ schedule, room, movie, selectedSeats }) {
    const navigate = useNavigate();

    const handleClickSubmit = () => {
        console.log("Check submit: ", schedule, selectedSeats);
        navigate("/select-food", {
            state: {
                seats: selectedSeats,
                schedule: schedule,
                room: room,
                movie: movie,
            },
        });
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

    const renderTotalAmount = () => {
        let normalCount = selectedSeats.filter((seat) => seat.type === 1).length;
        let coupleCount = selectedSeats.filter((seat) => seat.type === 2).length;

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
                            {formatVND(normalCount * 60000 + coupleCount * 75000)}
                        </Typography>
                    </Box>
                </>
            );
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
            {renderTotalAmount()}

            {selectedSeats && selectedSeats.length > 0 ? (
                <Button
                    size="large"
                    variant="contained"
                    sx={{ width: "100%", my: 2 }}
                    onClick={handleClickSubmit}
                >
                    TIẾP TỤC ĐẶT VÉ
                </Button>
            ) : (
                <Typography
                    sx={{
                        fontSize: "15px",
                        mb: 2,
                        fontFamily: "Be Vietnam Pro",
                    }}
                >
                    Bạn chưa chọn ghế, hãy chọn ghế để tiếp tục!
                </Typography>
            )}
        </Box>
    );
}

export default SeatBookingInfo;

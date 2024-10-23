import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getScheduleByIdAPI, getMovieByIdAPI, getRoomByIdAPI, getAllBookedSeatsAPI } from "~/apis";
import Navbar from "~/components/Navbar/Navbar";
import SeatMap from "./SeatMap/SeatMap";
import SeatBookingInfo from "./SeatBookingInfo/SeatBookingInfo";
import Footer from "~/components/Footer/Footer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function SeatSelection() {
    const [searchParams] = useSearchParams();
    const scheduleId = searchParams.get("scheduleId");
    const [schedule, setSchedule] = useState(null);
    const [room, setRoom] = useState(null);
    const [movie, setMovie] = useState(null);

    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        fetchRoomAndMovie();
    }, []);

    const fetchRoomAndMovie = async () => {
        let scheduleResponse = await getScheduleByIdAPI(scheduleId);
        let movieResponse = await getMovieByIdAPI(scheduleResponse.data.movieId);

        setSchedule(scheduleResponse.data);
        setMovie(movieResponse.data);

        let roomResponse = await getRoomByIdAPI(scheduleResponse.data.roomId);
        let bookedSeatResponse = await getAllBookedSeatsAPI(scheduleId);

        let seatMap = JSON.parse(roomResponse.data.seatMap);
        let bookedSeatsPosition = bookedSeatResponse.data.map((seat) =>
            JSON.parse(seat.seatPosition)
        );
        bookedSeatsPosition.forEach(([rowIndex, colIndex]) => {
            seatMap[rowIndex][colIndex] = 3;
        });

        console.log("Check booked seat: ", bookedSeatsPosition);
        console.log("Check seatMap: ", seatMap);

        setRoom({ ...roomResponse.data, seatMap: seatMap });
    };

    const handleSetSelectedSeats = (rowIndex, colIndex, type, seatName) => {
        let copySelectedSeats = [...selectedSeats];
        for (let i = 0; i < copySelectedSeats.length; i++) {
            if (
                copySelectedSeats[i].rowIndex === rowIndex &&
                copySelectedSeats[i].colIndex === colIndex
            ) {
                copySelectedSeats.splice(i, 1);
                setSelectedSeats(copySelectedSeats);
                return;
            }
        }
        copySelectedSeats.push({
            rowIndex: rowIndex,
            colIndex: colIndex,
            type: type,
            seatName: seatName,
        });

        setSelectedSeats(copySelectedSeats);
    };

    console.log("Check room render: ", room);

    return (
        <Box sx={{ bgcolor: "#f8f8f8" }}>
            <Navbar />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    mb: 5,
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: "25px",
                            fontWeight: 600,
                            fontFamily: "Be Vietnam Pro",
                            textAlign: "center",
                            py: 1,
                            px: 2,
                            mt: 3,
                            color: "#337ab7",
                            borderRadius: "15px",
                            border: "1px solid #337ab7",
                        }}
                    >
                        BƯỚC 2: CHỌN GHẾ NGỒI
                    </Typography>
                </Box>

                <Box
                    sx={{
                        maxWidth: "1280px",
                        width: "100%",
                        px: 6,
                        mt: 2,
                    }}
                >
                    {movie && (
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                gap: 3,
                                py: 2,
                                px: 2.5,
                                borderRadius: "15px",
                                border: "1px solid #bbbbbb",
                            }}
                        >
                            <Box
                                sx={{
                                    flexShrink: 0,
                                    width: "200px",
                                    background: `url(${movie.image})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ></Box>

                            <Box sx={{ width: "100%" }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontSize: "22px",
                                        fontFamily: "Be VietNam Pro",
                                        fontWeight: 600,
                                        color: "#337ab7",
                                        mb: 1,
                                    }}
                                >
                                    {movie.movieName}{" "}
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "105px",
                                            fontWeight: 500,

                                            color: "#5d5d5d",
                                        }}
                                    >{`(${movie.ageLimit})`}</span>
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontFamily: "Be Vietnam Pro",
                                        mb: 1,
                                    }}
                                >
                                    {movie.description}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        mb: 0.5,
                                        fontFamily: "Be Vietnam Pro",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "105px",
                                            fontWeight: 500,
                                            color: "#337ab7",
                                        }}
                                    >
                                        Đạo diễn:{" "}
                                    </span>{" "}
                                    {movie.directors}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        mb: 0.5,
                                        fontFamily: "Be Vietnam Pro",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "105px",
                                            fontWeight: 500,

                                            color: "#337ab7",
                                        }}
                                    >
                                        Diễn viên:{" "}
                                    </span>{" "}
                                    {movie.actors}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        mb: 0.5,
                                        fontFamily: "Be Vietnam Pro",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "105px",
                                            fontWeight: 500,

                                            color: "#337ab7",
                                        }}
                                    >
                                        Thể loại:{" "}
                                    </span>{" "}
                                    {movie.category}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        mb: 0.5,
                                        fontFamily: "Be Vietnam Pro",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "105px",
                                            fontWeight: 500,

                                            color: "#337ab7",
                                        }}
                                    >
                                        Phân loại:{" "}
                                    </span>{" "}
                                    {movie.ageLimit}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        mb: 0.5,
                                        fontFamily: "Be Vietnam Pro",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "105px",
                                            fontWeight: 500,

                                            color: "#337ab7",
                                        }}
                                    >
                                        Thời lượng:{" "}
                                    </span>{" "}
                                    {movie.duration} phút
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        mb: 0.5,
                                        fontFamily: "Be Vietnam Pro",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "105px",
                                            fontWeight: 500,

                                            color: "#337ab7",
                                        }}
                                    >
                                        Định dạng:{" "}
                                    </span>{" "}
                                    {movie.movieFormat}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        mb: 0.5,
                                        fontFamily: "Be Vietnam Pro",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "105px",
                                            fontWeight: 500,

                                            color: "#337ab7",
                                        }}
                                    >
                                        Ngôn ngữ:{" "}
                                    </span>{" "}
                                    {movie.audioType === "both"
                                        ? "Thuyết minh, Phụ đề"
                                        : movie.audioType === "subtitled"
                                        ? "Thuyết minh"
                                        : "Phụ đề"}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>

                <Box
                    sx={{
                        maxWidth: "1280px",
                        width: "100%",
                        display: "flex",
                        gap: 4,
                        py: 2,
                        px: 6,
                        mt: 2,
                    }}
                >
                    {room && (
                        <SeatMap
                            seatMap={room.seatMap}
                            selectedSeats={selectedSeats}
                            handleSetSelectedSeats={handleSetSelectedSeats}
                        />
                    )}

                    {schedule && movie && room && (
                        <SeatBookingInfo
                            schedule={schedule}
                            room={room}
                            movie={movie}
                            selectedSeats={selectedSeats}
                        />
                    )}
                </Box>
            </Box>

            <Footer />
        </Box>
    );
}

export default SeatSelection;

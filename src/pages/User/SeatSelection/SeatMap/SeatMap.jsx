import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function SeatMap({ seatMap, selectedSeats, handleSetSelectedSeats }) {
    // const [bookedSeats, setBookedSeats] = useState([]);

    // useEffect(() => {
    //     const fetchBookedSeats = async () => {
    //         let response = await getAllBookedSeatsAPI(scheduleId);
    //         setBookedSeats(response.data);
    //     };
    //     fetchBookedSeats();
    // }, []);

    const getLetterFromIndex = (index) => {
        return String.fromCharCode(65 + index);
    };

    const getSeatColor = (value) => {
        switch (value) {
            case 0:
                return "#f5f5f5";
            case 1:
                return "#ffffff";
            case 2:
                return "#ff9fcf";
            case 3:
                return "#d8d8d8";
        }
    };

    const getSeatColNumber = (rowData, colIndex) => {
        let count = 1;
        for (let i = 0; i < rowData.length; i++) {
            if (i === colIndex) return count;
            if (rowData[i] !== 0) count += 1;
        }
    };

    const renderSeatRow = (rowIndex, rowData) => {
        let count = 1;

        return rowData.map((seatValue, colIndex) => {
            for (let i = 0; i < selectedSeats.length; i++) {
                if (
                    selectedSeats[i].rowIndex === rowIndex &&
                    selectedSeats[i].colIndex === colIndex
                ) {
                    return (
                        <Box
                            key={colIndex}
                            sx={{
                                width: 40,
                                height: 28,
                                color: "#ffffff",
                                backgroundColor: "#f73636",
                                borderRadius: "5px",
                                border: "1px solid #d9d9d9",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "14px",
                            }}
                            onClick={() =>
                                handleSetSelectedSeats(
                                    rowIndex,
                                    colIndex,
                                    seatValue,
                                    getLetterFromIndex(rowIndex) +
                                        getSeatColNumber(rowData, colIndex)
                                )
                            }
                        >
                            {count++}
                        </Box>
                    );
                }
            }

            return seatValue === 3 ? (
                <Box
                    key={colIndex}
                    sx={{
                        width: 40,
                        height: 28,
                        color: "#8f8f8f",
                        backgroundColor: getSeatColor(seatValue),
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px",
                        cursor: "default",
                    }}
                >
                    {count++}
                </Box>
            ) : seatValue !== 0 ? (
                <Box
                    key={colIndex}
                    sx={{
                        width: 40,
                        height: 28,
                        color: "#337ab7",
                        backgroundColor: getSeatColor(seatValue),
                        borderRadius: "5px",
                        border: "1px solid #d9d9d9",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px",
                    }}
                    onClick={() =>
                        handleSetSelectedSeats(
                            rowIndex,
                            colIndex,
                            seatValue,
                            getLetterFromIndex(rowIndex) + getSeatColNumber(rowData, colIndex)
                        )
                    }
                >
                    {count++}
                </Box>
            ) : (
                <Box
                    key={colIndex}
                    sx={{
                        width: 40,
                        height: 28,
                        backgroundColor: "transparent",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px",
                    }}
                ></Box>
            );
        });
    };

    return (
        <Box sx={{ width: "70%", borderRadius: "15px" }}>
            <Box
                sx={{
                    width: "80%",
                    height: "6px",
                    margin: "20px auto 40px",
                    bgcolor: "rgba(60, 60, 60, 0.87)",
                    boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
                }}
            >
                <Typography
                    component="div"
                    sx={{
                        color: "text.secondary",
                        fontSize: "16px",
                        textAlign: "center",
                        pt: 1,
                    }}
                >
                    Màn hình chiếu phim
                </Typography>
            </Box>

            <Box sx={{ mt: 10, mb: 5 }}>
                {seatMap &&
                    seatMap.length > 0 &&
                    seatMap.map((rowData, rowIndex) => (
                        <Box
                            key={rowIndex}
                            sx={{
                                display: "flex",
                                gap: 1.5,
                                justifyContent: "center",
                                mb: 1,
                            }}
                        >
                            <Typography
                                component="div"
                                sx={{
                                    width: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "#337ab7",
                                }}
                            >
                                {getLetterFromIndex(rowIndex)}
                            </Typography>

                            {renderSeatRow(rowIndex, rowData)}

                            <Typography
                                component="div"
                                sx={{
                                    width: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "#337ab7",
                                }}
                            >
                                {getLetterFromIndex(rowIndex)}
                            </Typography>
                        </Box>
                    ))}
            </Box>

            {/* Ghi chu loai ghe */}
            <Box
                sx={{
                    display: "flex",
                    gap: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "3px",
                            border: "1px solid #d9d9d9",
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                        }}
                    />
                    <Typography component="div" fontSize={"14px"}>
                        Ghế thường
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "3px",
                            border: "1px solid #d9d9d9",
                            backgroundColor: "#ff9fcf",
                            cursor: "pointer",
                        }}
                    />
                    <Typography component="div" fontSize={"14px"}>
                        Ghế đôi
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "3px",
                            border: "1px solid #d9d9d9",
                            backgroundColor: "#ddd",
                            cursor: "pointer",
                        }}
                    />
                    <Typography component="div" fontSize={"14px"}>
                        Ghế đã bán
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default SeatMap;

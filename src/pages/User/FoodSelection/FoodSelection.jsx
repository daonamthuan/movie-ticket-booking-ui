import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRoomByIdAPI, getMovieByIdAPI, fetchFoodsAPI } from "~/apis";
import Navbar from "~/components/Navbar/Navbar";
import FoodMenu from "./FoodMenu/FoodMenu";
import FoodBookingInfo from "./FoodBookingInfo/FoodBookingInfo";
import Footer from "~/components/Footer/Footer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function FoodSelection() {
    const location = useLocation();
    const { seats, schedule, room, movie } = location.state;
    const [foods, setFoods] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let foodsResponse = await fetchFoodsAPI();

        setFoods(foodsResponse.data);
    };

    const handleSetSelectedFoods = (food, quantity) => {
        let copySelectedFoods = [...selectedFoods];
        for (let i = 0; i < copySelectedFoods.length; i++) {
            if (copySelectedFoods[i].food.id === food.id) {
                copySelectedFoods.splice(i, 1);
                break;
            }
        }

        if (quantity !== 0) {
            copySelectedFoods.push({
                food: food,
                quantity: quantity,
            });
        }
        setSelectedFoods(copySelectedFoods);
    };

    console.log("Check selected foods: ", selectedFoods);

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
                        BƯỚC 3: CHỌN ĐỒ ĂN
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
                    {foods && (
                        <FoodMenu foods={foods} handleSetSelectedFoods={handleSetSelectedFoods} />
                    )}

                    {schedule && movie && room && (
                        <FoodBookingInfo
                            schedule={schedule}
                            room={room}
                            movie={movie}
                            selectedSeats={seats}
                            selectedFoods={selectedFoods}
                        />
                    )}
                </Box>
            </Box>

            <Footer />
        </Box>
    );
}

export default FoodSelection;

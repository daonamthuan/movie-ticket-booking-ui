import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getMovieByIdAPI } from "~/apis";
import { Link as RouterLink } from "react-router-dom";
import { capitalizeFirstLetterEachWord } from "~/utils/helper";
import { setMovieTrailerUrl } from "~/redux/slice/homeSlice";
import { fetchAllCinemasAPI, getNextThreeDaysScheduleAPI } from "~/apis";
import MovieTrailer from "../HomePage/MovieTrailer/MovieTrailer";
import Link from "@mui/material/Link";
import Navbar from "~/components/Navbar/Navbar";
import Footer from "~/components/Footer/Footer";
import ScheduleShowing from "~/components/ScheduleShowing/ScheduleShowing";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import CameraIndoorOutlinedIcon from "@mui/icons-material/CameraIndoorOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HighQualityOutlinedIcon from "@mui/icons-material/HighQualityOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function MovieDetail() {
    const dispatch = useDispatch();
    const { movieId } = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [cinemas, setCinemas] = useState([]);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetchMovieInfo(movieId);
        fetchAllCinemas();
        fetchNextThreeDaysSchedule();
    }, []);

    const fetchMovieInfo = async (movieId) => {
        const response = await getMovieByIdAPI(movieId);
        setMovieInfo(response.data);
    };

    const fetchAllCinemas = async () => {
        const response = await fetchAllCinemasAPI();
        setCinemas(response.data);
    };

    const fetchNextThreeDaysSchedule = async () => {
        const response = await getNextThreeDaysScheduleAPI(movieId);
        setSchedules(response.data);
    };

    const handleViewTrailer = (movieTrailerUrl) => {
        dispatch(setMovieTrailerUrl(movieTrailerUrl));
    };

    // const ListScheduleShowing = () => {
    //     if (cinemas && cinemas.length > 0) {
    //         for (let cinema of cinemas) {
    //             console.log("Check cinema xx: ", cinema);
    //         }
    //     }
    // };

    return (
        <>
            <Box sx={{ bgcolor: "#f8f8f8" }}>
                <Navbar />

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                        mb: 5,
                    }}
                >
                    {!_.isEmpty(movieInfo) && (
                        <Box
                            sx={{
                                maxWidth: "1280px",
                                width: "100%",
                                py: 2,
                            }}
                        >
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    component={RouterLink}
                                    to="/home"
                                    sx={{ fontSize: "19px" }}
                                >
                                    Trang chủ
                                </Link>
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    component={RouterLink}
                                    to="/movies"
                                    sx={{ fontSize: "19px" }}
                                >
                                    Phim
                                </Link>
                                <Link
                                    underline="hover"
                                    component={RouterLink}
                                    aria-current="page"
                                    sx={{ fontSize: "19px" }}
                                >
                                    {capitalizeFirstLetterEachWord(movieInfo.movieName)}
                                </Link>
                            </Breadcrumbs>

                            <Box sx={{ display: "flex", gap: 4, mt: 3 }}>
                                <Box
                                    sx={{
                                        flexShrink: 0,
                                        width: "470px",
                                        height: "700px",
                                        background: `url(${movieInfo.image})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                ></Box>

                                <Box>
                                    <Box sx={{ width: "100%" }}>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontSize: "26px",
                                                fontFamily: "Be VietNam Pro",
                                                fontWeight: 600,
                                                color: "#337ab7",
                                                mb: 2,
                                            }}
                                        >
                                            {movieInfo.movieName}{" "}
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    width: "105px",
                                                    fontWeight: 500,

                                                    color: "#5d5d5d",
                                                }}
                                            >{`(${movieInfo.ageLimit})`}</span>
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                mb: "6px",
                                                fontFamily: "Be Vietnam Pro",
                                                mb: 2,
                                            }}
                                        >
                                            {movieInfo.description}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                mb: "6px",
                                                fontFamily: "Be Vietnam Pro",
                                            }}
                                        >
                                            <CameraIndoorOutlinedIcon
                                                sx={{
                                                    color: "#337ab7",
                                                    mr: "6px",
                                                    verticalAlign: "middle",
                                                }}
                                            />{" "}
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
                                            {movieInfo.directors}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                mb: "6px",
                                                fontFamily: "Be Vietnam Pro",
                                            }}
                                        >
                                            <PeopleAltOutlinedIcon
                                                sx={{
                                                    color: "#337ab7",
                                                    mr: "6px",
                                                    verticalAlign: "middle",
                                                }}
                                            />{" "}
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
                                            {movieInfo.actors}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                mb: "6px",
                                                fontFamily: "Be Vietnam Pro",
                                            }}
                                        >
                                            <LocalOfferOutlinedIcon
                                                sx={{
                                                    color: "#337ab7",
                                                    mr: "6px",
                                                    verticalAlign: "middle",
                                                }}
                                            />{" "}
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
                                            {movieInfo.category}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                mb: "6px",
                                                fontFamily: "Be Vietnam Pro",
                                            }}
                                        >
                                            <DoDisturbAltOutlinedIcon
                                                sx={{
                                                    color: "#337ab7",
                                                    mr: "6px",
                                                    verticalAlign: "middle",
                                                }}
                                            />{" "}
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
                                            {movieInfo.ageLimit}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                mb: "6px",
                                                fontFamily: "Be Vietnam Pro",
                                            }}
                                        >
                                            <AccessTimeIcon
                                                sx={{
                                                    color: "#337ab7",
                                                    mr: "6px",
                                                    verticalAlign: "middle",
                                                }}
                                            />{" "}
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
                                            {movieInfo.duration} phút
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                mb: "6px",
                                                fontFamily: "Be Vietnam Pro",
                                            }}
                                        >
                                            <HighQualityOutlinedIcon
                                                sx={{
                                                    color: "#337ab7",
                                                    mr: "6px",
                                                    verticalAlign: "middle",
                                                }}
                                            />{" "}
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
                                            {movieInfo.movieFormat}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                mb: "6px",
                                                fontFamily: "Be Vietnam Pro",
                                            }}
                                        >
                                            <LanguageIcon
                                                sx={{
                                                    color: "#337ab7",
                                                    mr: "6px",
                                                    verticalAlign: "middle",
                                                }}
                                            />{" "}
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
                                            {movieInfo.audioType === "both"
                                                ? "Thuyết minh, Phụ đề"
                                                : movieInfo.audioType === "subtitled"
                                                ? "Thuyết minh"
                                                : "Phụ đề"}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                mb: "6px",
                                                fontFamily: "Be Vietnam Pro",
                                            }}
                                        >
                                            <NotStartedOutlinedIcon
                                                sx={{
                                                    color: "#337ab7",
                                                    mr: "6px",
                                                    verticalAlign: "middle",
                                                }}
                                            />{" "}
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    width: "105px",
                                                    fontWeight: 500,

                                                    color: "#337ab7",
                                                    mr: "8px !important",
                                                }}
                                            >
                                                Trạng thái:{" "}
                                            </span>{" "}
                                            {movieInfo.status === "now-showing"
                                                ? "Đang chiếu"
                                                : "Sắp chiếu"}
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<PlayArrowIcon />}
                                            sx={{
                                                mt: 1.5,
                                                padding: "8px 16px",
                                                borderRadius: "8px",
                                                "&:hover": {
                                                    backgroundColor: "#0056b3",
                                                },
                                                transition: "background-color 0.3s",
                                                bgcolor: "#337ab7",
                                            }}
                                            onClick={() => handleViewTrailer(movieInfo.trailer)}
                                        >
                                            Xem trailer
                                        </Button>
                                    </Box>

                                    <Box sx={{ width: "100%", mt: 3 }}>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontSize: "26px",
                                                fontFamily: "Be VietNam Pro",
                                                fontWeight: 600,
                                                color: "#337ab7",
                                                mb: 1,
                                            }}
                                        >
                                            LỊCH CHIẾU
                                        </Typography>

                                        {cinemas &&
                                            cinemas.length > 0 &&
                                            cinemas.map((cinema, index) => {
                                                let roomIds = cinema.cinemaRooms.map(
                                                    (room) => room.id
                                                );
                                                let cinemaSchedules = schedules.filter((schedule) =>
                                                    roomIds.includes(schedule.roomId)
                                                );

                                                return (
                                                    <ScheduleShowing
                                                        key={index}
                                                        cinema={cinema}
                                                        schedules={cinemaSchedules}
                                                    />
                                                );
                                            })}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>

                <Footer />
            </Box>

            <MovieTrailer />
        </>
    );
}

export default MovieDetail;

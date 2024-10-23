import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMoviesHome } from "~/redux/slice/homeSlice";
import Box from "@mui/material/Box";
import Navbar from "~/components/Navbar/Navbar";
import CarouselBanner from "~/pages/User/HomePage/Carousel/CarouselBanner";
import MovieSlider from "./MovieSlider/MovieSlider";
import { Typography } from "@mui/material";
import MovieTrailer from "~/pages/User/HomePage/MovieTrailer/MovieTrailer";
import Promotion from "~/pages/User/HomePage/Promotion/Promotion";
import Footer from "~/components/Footer/Footer";

function HomePage() {
    const dispatch = useDispatch();
    const allMovies = useSelector((state) => state.home.allMovies);

    useEffect(() => {
        dispatch(fetchAllMoviesHome());
    }, []);

    return (
        <>
            <Box sx={{ bgcolor: "#f8f8f8" }}>
                <Navbar />
                <CarouselBanner />

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    {/* Phim đang chiếu */}
                    <Box
                        sx={{
                            maxWidth: "1280px",
                            width: "100%",
                            py: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "28px",
                                fontWeight: 600,
                                fontFamily: "Be Vietnam Pro",
                                textAlign: "center",
                                mt: 2,
                                mb: 3,
                                color: "#337ab7",
                            }}
                        >
                            PHIM ĐANG CHIẾU
                        </Typography>
                        <MovieSlider
                            movies={allMovies.filter((movie) => movie.status === "now-showing")}
                        />
                    </Box>

                    {/* Phim sắp chiếu */}
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
                                mt: 2,
                                mb: 3,
                                color: "#337ab7",
                            }}
                        >
                            PHIM SẮP CHIẾU
                        </Typography>
                        <MovieSlider
                            movies={allMovies.filter((movie) => movie.status === "coming-soon")}
                        />
                    </Box>

                    <Promotion />
                </Box>

                <Footer />
            </Box>

            <MovieTrailer />
        </>
    );
}

export default HomePage;

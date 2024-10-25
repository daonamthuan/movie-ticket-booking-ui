import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import MovieSliderCard from "./MovieSliderCard/MovieSliderCard";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

function NextArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "40%",
                right: "10px",
                transform: "translateY(-50%)",
                zIndex: 1,
                background: "white",
                borderRadius: "50%",
                boxShadow: 2, // Thêm bóng cho nút
            }}
        >
            <ArrowForward sx={{ fontSize: 30 }} /> {/* Thay đổi kích thước icon */}
        </IconButton>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "40%",
                left: "10px",
                transform: "translateY(-50%)",
                zIndex: 1,
                background: "white",
                borderRadius: "50%",
                boxShadow: 2, // Thêm bóng cho nút
            }}
        >
            <ArrowBack sx={{ fontSize: 30 }} /> {/* Thay đổi kích thước icon */}
        </IconButton>
    );
}

function MovieSlider({ movies }) {
    var settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        // <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Slider {...settings}>
            {movies &&
                movies.length > 0 &&
                movies.map((movie, index) => <MovieSliderCard key={index} movieInfo={movie} />)}
        </Slider>
        // </Box>
    );
}

export default MovieSlider;

import { useDispatch } from "react-redux";
import { setMovieTrailerUrl } from "~/redux/slice/homeSlice";
import { capitalizeFirstLetterEachWord } from "~/utils/helper";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function MovieSliderCard({ movieInfo }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleViewTrailer = (movieTrailerUrl) => {
        dispatch(setMovieTrailerUrl(movieTrailerUrl));
    };

    const handleClickMovie = (movieInfo) => {
        let movieId = movieInfo.id;
        navigate(`/movie-detail/${movieId}`);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ maxWidth: 260, bgcolor: "transparent", boxShadow: "none" }}>
                <CardMedia
                    sx={{ height: 360, cursor: "pointer" }}
                    image={movieInfo.image}
                    title="movie poster"
                    onClick={() => handleClickMovie(movieInfo)}
                />
                <CardContent sx={{ height: "95px", px: 0, py: 1 }}>
                    <Typography
                        gutterBottom
                        component="div"
                        onClick={() => handleClickMovie(movieInfo)}
                        sx={{
                            fontFamily: "Be Vietnam Pro",
                            fontWeight: 600,
                            color: "#337ab7",
                            fontSize: "17px",
                            width: "260px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            textTransform: "capitalize",
                            cursor: "pointer",
                            "&:hover": {
                                color: "#005792",
                            },
                        }}
                    >
                        {capitalizeFirstLetterEachWord(movieInfo.movieName)}
                    </Typography>
                    <Typography variant="body2">
                        <span
                            style={{
                                fontFamily: "Be Vietnam Pro",
                                fontWeight: "bold",
                                color: "#333",
                            }}
                        >
                            Thể loại:
                        </span>{" "}
                        {movieInfo.category}
                    </Typography>
                    <Typography variant="body2">
                        <span
                            style={{
                                fontFamily: "Be Vietnam Pro",
                                fontWeight: "bold",
                                color: "#333",
                            }}
                        >
                            Thời lượng:
                        </span>{" "}
                        {movieInfo.duration} phút
                    </Typography>
                </CardContent>
                <CardActions sx={{ px: 0 }}>
                    <Button
                        size="small"
                        variant="text"
                        startIcon={<PlayArrowIcon sx={{ mr: "-5px" }} />}
                        sx={{ color: "#333", fontSize: "14px", textTransform: "none" }}
                        onClick={() => handleViewTrailer(movieInfo.trailer)}
                    >
                        Xem trailer
                    </Button>
                    <Button
                        size="medium"
                        variant="contained"
                        sx={{ flexGrow: 1 }}
                        onClick={() => handleClickMovie(movieInfo)}
                    >
                        Đặt vé ngay
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default MovieSliderCard;

{
    /* <Typography
                        variant="body2"
                        sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                            textOverflow: "ellipsis",
                        }}
                    >
                        {movieInfo.description}
                    </Typography> */
}

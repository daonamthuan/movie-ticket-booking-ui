import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setMovieEditData } from "~/redux/slice/movieSlice";
import { deleteMovieAPI } from "~/apis";
import { toast } from "react-toastify";
import { getFileNameFromPath } from "~/utils/helper";

function MovieCard({ movieInfo, setIsOpenMovieModal, handleFetchMovies }) {
    const dispatch = useDispatch();

    const shortenMovieDescription = (description) => {
        const MAX_LENGTH = 180;
        if (description.length > MAX_LENGTH) return description.substring(0, MAX_LENGTH) + "...";
        return description;
    };

    const handleEditMovie = (movieInfo) => {
        dispatch(setMovieEditData(movieInfo));
        setIsOpenMovieModal(true);
        console.log("Movie Info: ", movieInfo);
    };

    const handleDeleteMovie = async (movieInfo) => {
        let publicId = getFileNameFromPath(movieInfo.image);
        let response = await deleteMovieAPI(movieInfo.id, publicId);
        if (response && response.status === 200) {
            toast.success("Xóa phim thành công!");
            handleFetchMovies();
        }
    };

    return (
        <Card sx={{ width: "100%", display: "flex", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
            <CardMedia
                component="img"
                sx={{ width: 120 }}
                image={movieInfo.image}
                alt="Live from space album cover"
            />
            <Box sx={{ width: "60%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", px: 2, py: 1.25 }}>
                    <Typography component="div" variant="h6">
                        {movieInfo.movieName}
                    </Typography>
                    <Typography component="div" sx={{ color: "text.secondary", fontSize: "14px" }}>
                        Thời lượng: {movieInfo.duration} phút
                    </Typography>
                    <Typography component="div" sx={{ color: "text.secondary", fontSize: "14px" }}>
                        Đạo diễn: {movieInfo.directors}
                    </Typography>
                    <Typography component="div" sx={{ color: "text.secondary", fontSize: "14px" }}>
                        Diễn viên: {movieInfo.actors}
                    </Typography>

                    <Typography component="div" sx={{ color: "text.secondary", fontSize: "14px" }}>
                        Ngày phát hành: {dayjs(movieInfo.releaseDate).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography component="div" sx={{ color: "text.secondary", fontSize: "14px" }}>
                        Mô tả: {shortenMovieDescription(movieInfo.description)}
                    </Typography>
                </CardContent>
            </Box>

            <Box
                sx={{
                    width: "18%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {movieInfo.status === "now-showing" ? (
                    <Box
                        sx={{
                            minWidth: "162px",
                            textAlign: "center",
                            bgcolor: "#04AA6D",
                            py: 1,
                            color: "common.white",
                            borderRadius: "20px",
                        }}
                    >
                        Phim đang chiếu
                    </Box>
                ) : (
                    <Box
                        sx={{
                            minWidth: "162px",
                            textAlign: "center",
                            bgcolor: "#ffc107",
                            py: 1,
                            color: "common.white",
                            borderRadius: "20px",
                        }}
                    >
                        Phim sắp chiếu
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <IconButton
                    onClick={() => handleEditMovie(movieInfo)}
                    aria-label="edit"
                    sx={{ color: "primary.main" }}
                >
                    <EditIcon sx={{ fontSize: 26 }} />
                </IconButton>
                <IconButton
                    onClick={() => handleDeleteMovie(movieInfo)}
                    aria-label="delete"
                    sx={{ color: "red" }}
                >
                    <DeleteIcon sx={{ fontSize: 26 }} />
                </IconButton>
            </Box>
        </Card>
    );
}

export default MovieCard;

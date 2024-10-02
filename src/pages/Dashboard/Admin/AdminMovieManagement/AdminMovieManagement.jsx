import { useState, useEffect } from "react";
import { getAllMoviesByStatusAPI } from "~/apis";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import AddIcon from "@mui/icons-material/Add";

function AdminMovieManagement() {
    const [movies, setMovies] = useState([]);
    const [movieStatus, setMovieStatus] = useState("all");
    const [isOpenMovieModal, setIsOpenMovieModal] = useState(false);

    const fetchMovies = async (movieStatus) => {
        let response = await getAllMoviesByStatusAPI(movieStatus);
        setMovies(response.data);
    };

    useEffect(() => {
        fetchMovies(movieStatus);
    }, [movieStatus]);

    const handleChange = (event) => {
        setMovieStatus(event.target.value);
    };

    const handleOpenMovieModal = () => {
        setIsOpenMovieModal(true);
    };

    const handleFetchMovies = () => {
        fetchMovies(movieStatus);
    };

    return (
        <>
            <Box sx={{ bgcolor: "background.paper", p: "20px 30px", borderRadius: "20px" }}>
                <Typography
                    sx={{
                        mb: 1.5,
                        fontSize: "18px",
                        fontWeight: 600,
                        textAlign: "center",
                        color: "#005792",
                    }}
                >
                    QUẢN LÝ PHIM CHIẾU
                </Typography>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <FormControl sx={{ minWidth: 180 }}>
                            <InputLabel id="demo-simple-select-label">Chọn loại phim</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={movieStatus}
                                label="Chọn loại phim"
                                onChange={handleChange}
                                size="small"
                            >
                                <MenuItem value={"now-showing"}>Phim đang chiếu</MenuItem>
                                <MenuItem value={"coming-soon"}>Phim sắp chiếu</MenuItem>
                                <MenuItem value={"all"}>Tất cả phim</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            onClick={handleOpenMovieModal}
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            sx={{
                                width: "170px",
                                px: 0.5,
                                fontSize: "14px",
                                textTransform: "none",
                            }}
                        >
                            Thêm bộ phim mới
                        </Button>
                    </Box>

                    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                        {movies &&
                            movies.length > 0 &&
                            movies.map((movie, index) => {
                                return (
                                    <MovieCard
                                        key={index}
                                        movieInfo={movie}
                                        setIsOpenMovieModal={setIsOpenMovieModal}
                                        handleFetchMovies={handleFetchMovies}
                                    />
                                );
                            })}
                    </Box>
                </Box>
            </Box>
            <MovieModal
                isOpenMovieModal={isOpenMovieModal}
                setIsOpenMovieModal={setIsOpenMovieModal}
                handleFetchMovies={handleFetchMovies}
            />
        </>
    );
}

export default AdminMovieManagement;

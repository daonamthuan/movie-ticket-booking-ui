import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoIdFromTrailerUrl } from "~/utils/helper";
import { clearMovieTrailerUrl } from "~/redux/slice/homeSlice";
import { Button, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    boxShadow: 24,
};

function MovieTrailer() {
    const dispatch = useDispatch();
    const [videoId, setVideoId] = useState("");
    const movieTrailerUrl = useSelector((state) => state.home.movieTrailerUrl);

    useEffect(() => {
        if (movieTrailerUrl) {
            let videoId = getVideoIdFromTrailerUrl(movieTrailerUrl);
            setVideoId(videoId);
        }
    }, [movieTrailerUrl]);

    const handleClose = () => {
        dispatch(clearMovieTrailerUrl());
    };

    // Lấy ID video từ đường dẫn

    return (
        <Box>
            <Modal
                open={movieTrailerUrl !== ""}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{ lineHeight: 0 }}
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: -20,
                            top: -20,
                        }}
                    >
                        <CloseIcon sx={{ color: "#f8f8f8" }} />
                    </IconButton>
                    <iframe
                        width="100%"
                        height="600px"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </Box>
            </Modal>
        </Box>
    );
}

export default MovieTrailer;

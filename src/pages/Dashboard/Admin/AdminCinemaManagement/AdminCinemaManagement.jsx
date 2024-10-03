import { useState, useEffect } from "react";
import { fetchCinemasAPI } from "~/apis";
import CinemaModal from "./CinemaModal";
import CinemaCard from "./CinemaCard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

function AdminCinemaManagement() {
    const [cinemas, setCinemas] = useState([]);
    const [isOpenCinemaModal, setIsOpenCinemaModal] = useState(false);

    useEffect(() => {
        fetchCinemas();
    }, []);

    const fetchCinemas = async () => {
        let response = await fetchCinemasAPI();
        setCinemas(response.data);
    };

    const handleFetchCinemas = () => {
        fetchCinemas();
    };

    const handleOpenCinemaModal = () => {
        setIsOpenCinemaModal(true);
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
                    QUẢN LÝ RẠP CHIẾU PHIM
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 3 }}>
                        <Button
                            onClick={handleOpenCinemaModal}
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
                            Thêm rạp chiếu mới
                        </Button>
                    </Box>
                    <Grid container spacing={2}>
                        {cinemas &&
                            cinemas.length > 0 &&
                            cinemas.map((cinema, index) => {
                                return (
                                    <Grid item xs={4} key={index}>
                                        <CinemaCard
                                            cinemaInfo={cinema}
                                            setIsOpenCinemaModal={setIsOpenCinemaModal}
                                            handleFetchCinemas={handleFetchCinemas}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                </Box>
            </Box>
            <CinemaModal
                isOpenCinemaModal={isOpenCinemaModal}
                setIsOpenCinemaModal={setIsOpenCinemaModal}
                handleFetchCinemas={handleFetchCinemas}
            />
        </>
    );
}

export default AdminCinemaManagement;

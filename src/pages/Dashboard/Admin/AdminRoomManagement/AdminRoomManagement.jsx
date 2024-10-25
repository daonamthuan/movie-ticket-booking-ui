import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCinemaInfoByIdAPI } from "~/apis";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RoomTable from "./RoomTable";
import RoomModal from "./RoomModal";

function AdminRoomManagement() {
    const [rooms, setRooms] = useState([]);
    const [cinemaInfo, setCinemaInfo] = useState({});
    const [isOpenRoomModal, setIsOpenRoomModal] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const cinemaId = searchParams.get("cinemaId");

    const fetchCinemaInfo = async (cinemaId) => {
        let response = await getCinemaInfoByIdAPI(cinemaId);
        setCinemaInfo(response.data);
        setRooms(response.data.rooms);
    };

    useEffect(() => {
        fetchCinemaInfo(cinemaId);
    }, []);

    const handleFetchCinemaInfo = () => {
        fetchCinemaInfo(cinemaId);
    };

    const handleOpenRoomModal = () => {
        setIsOpenRoomModal(true);
    };

    return (
        <>
            <Box sx={{ bgcolor: "background.paper", p: "20px 30px", borderRadius: "20px" }}>
                <Typography
                    sx={{
                        mb: 0,
                        fontSize: "18px",
                        fontWeight: 600,
                        textAlign: "center",
                        color: "#005792",
                    }}
                >
                    QUẢN LÝ PHÒNG CHIẾU PHIM
                </Typography>
                <Typography
                    sx={{
                        mb: 1.5,
                        fontSize: "16px",
                        fontWeight: 500,
                        textAlign: "center",
                        color: "#005792",
                    }}
                >
                    Rạp phim: {cinemaInfo.cinemaName}
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 3 }}>
                        <Button
                            onClick={handleOpenRoomModal}
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            sx={{
                                width: "200px",
                                px: 0.5,
                                fontSize: "14px",
                                textTransform: "none",
                            }}
                        >
                            Thêm phòng chiếu mới
                        </Button>
                    </Box>
                    <RoomTable
                        rooms={rooms}
                        setIsOpenRoomModal={setIsOpenRoomModal}
                        handleFetchCinemaInfo={handleFetchCinemaInfo}
                    />
                </Box>
            </Box>
            <RoomModal
                cinemaId={cinemaId}
                isOpenRoomModal={isOpenRoomModal}
                setIsOpenRoomModal={setIsOpenRoomModal}
                handleFetchCinemaInfo={handleFetchCinemaInfo}
            />
        </>
    );
}

export default AdminRoomManagement;

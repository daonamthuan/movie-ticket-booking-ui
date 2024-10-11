import { useState, useEffect } from "react";
import { fetchSchedulesDataAPI } from "~/apis";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemas, fetchScheduleRooms, fetchScheduleMovies } from "~/redux/slice/scheduleSlice";
import ScheduleModal from "./ScheduleModal";
import ScheduleTable from "./ScheduleTable";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

function AdminScheduleManagement() {
    const dispatch = useDispatch();
    const [schedules, setSchedules] = useState([]);
    const [scheduleDataTable, setScheduleDataTable] = useState([]);
    const [isOpenScheduleModal, setIsOpenScheduleModal] = useState(false);

    const [selectedCinema, setSelectedCinema] = useState("all");
    const [selectedRoom, setSelectedRoom] = useState("all");
    const [selectedMovie, setSelectedMovie] = useState("all");

    const { cinemas, rooms, movies } = useSelector((state) => state.schedule);

    useEffect(() => {
        fetchSchedules();
        dispatch(fetchCinemas());
        dispatch(fetchScheduleRooms("all"));
        dispatch(fetchScheduleMovies("all"));
    }, []);

    useEffect(() => {
        console.log("Run useEffect 2");
        let newScheduleDataTable = [...schedules];
        if (selectedCinema !== "all") {
            let roomIds = rooms
                .filter((room) => room.cinemaId === selectedCinema)
                .map((room) => room.id);
            console.log("Check roomIds: ", roomIds);
            newScheduleDataTable = newScheduleDataTable.filter((schedule) =>
                roomIds.includes(schedule.roomId)
            );
            console.log("Check new data: ", newScheduleDataTable);
        }

        if (selectedRoom !== "all") {
            newScheduleDataTable = newScheduleDataTable.filter(
                (schedule) => schedule.roomId === selectedRoom
            );
        }

        if (selectedMovie !== "all") {
            newScheduleDataTable = newScheduleDataTable.filter(
                (schedule) => schedule.movieId === selectedMovie
            );
        }

        setScheduleDataTable(newScheduleDataTable);
    }, [selectedCinema, selectedMovie, selectedRoom]);

    const fetchSchedules = async () => {
        let response = await fetchSchedulesDataAPI();
        setSchedules(response.data);
        setScheduleDataTable(response.data);
    };

    const handleFetchSchedules = () => {
        fetchSchedules();
    };

    const handleOpenScheduleModal = () => {
        setIsOpenScheduleModal(true);
    };

    const handleChangeSelect = (event, name) => {
        if (name === "cinema") {
            setSelectedCinema(event.target.value);
        } else if (name === "room") {
            setSelectedRoom(event.target.value);
        } else if (name === "movie") {
            setSelectedMovie(event.target.value);
        }
    };

    return (
        <>
            <Box sx={{ bgcolor: "background.paper", p: "20px 30px", borderRadius: "20px" }}>
                <Typography
                    sx={{
                        mb: 2.5,
                        fontSize: "18px",
                        fontWeight: 600,
                        textAlign: "center",
                        color: "#005792",
                    }}
                >
                    QUẢN LÝ LỊCH CHIẾU
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ my: 2, display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <FormControl sx={{ minWidth: 180 }}>
                                <InputLabel id="select-cinema">Chọn cụm rạp</InputLabel>
                                <Select
                                    labelId="select-cinema"
                                    id="simple-select-cinema"
                                    value={selectedCinema}
                                    label="Chọn loại phim"
                                    onChange={(event) => {
                                        handleChangeSelect(event, "cinema");
                                    }}
                                    size="small"
                                >
                                    {cinemas &&
                                        cinemas.length > 0 &&
                                        cinemas.map((cinema, index) => {
                                            return (
                                                <MenuItem key={index} value={cinema.id}>
                                                    {cinema.cinemaName}
                                                </MenuItem>
                                            );
                                        })}

                                    <MenuItem value={"all"}>Tất cả</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 180 }}>
                                <InputLabel id="select-room">Chọn phòng chiếu</InputLabel>
                                <Select
                                    labelId="select-room"
                                    id="simple-select-room"
                                    value={selectedRoom}
                                    label="Chọn phòng chiếu"
                                    onChange={(event) => {
                                        handleChangeSelect(event, "room");
                                    }}
                                    size="small"
                                >
                                    {selectedCinema !== "all" &&
                                        rooms &&
                                        rooms.length > 0 &&
                                        rooms
                                            .filter((room) => room.cinemaId === selectedCinema)
                                            .map((room, index) => {
                                                return (
                                                    <MenuItem key={index} value={room.id}>
                                                        {room.roomName}
                                                    </MenuItem>
                                                );
                                            })}
                                    <MenuItem value={"all"}>Tất cả</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 180 }}>
                                <InputLabel id="select-movie">Chọn phim</InputLabel>
                                <Select
                                    labelId="select-movie"
                                    id="simple-select-movie"
                                    value={selectedMovie}
                                    label="Chọn phim"
                                    onChange={(event) => {
                                        handleChangeSelect(event, "movie");
                                    }}
                                    size="small"
                                >
                                    {movies &&
                                        movies.length > 0 &&
                                        movies.map((movie, index) => {
                                            return (
                                                <MenuItem key={index} value={movie.id}>
                                                    {movie.movieName}
                                                </MenuItem>
                                            );
                                        })}

                                    <MenuItem value={"all"}>Tất cả</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    <ScheduleTable
                        schedules={scheduleDataTable}
                        setIsOpenScheduleModal={setIsOpenScheduleModal}
                        handleFetchSchedules={handleFetchSchedules}
                    />
                    <Box sx={{ mt: 2 }}>
                        <Button
                            onClick={handleOpenScheduleModal}
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
                            Thêm lịch chiếu mới
                        </Button>
                    </Box>
                </Box>
            </Box>
            <ScheduleModal
                isOpenScheduleModal={isOpenScheduleModal}
                setIsOpenScheduleModal={setIsOpenScheduleModal}
                handleFetchSchedules={handleFetchSchedules}
            />
        </>
    );
}

export default AdminScheduleManagement;

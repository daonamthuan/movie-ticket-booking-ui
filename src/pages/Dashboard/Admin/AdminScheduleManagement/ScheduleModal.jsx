import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearDataScheduleEdit } from "~/redux/slice/scheduleSlice";
import { toast } from "react-toastify";
import { createNewScheduleAPI, updateScheduleAPI } from "~/apis";
import { DatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import _ from "lodash";

const styleScheduleModal = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    outline: "none",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
};

function ScheduleModal({ isOpenScheduleModal, setIsOpenScheduleModal, handleFetchSchedules }) {
    const dispatch = useDispatch();
    const dataScheduleEdit = useSelector((state) => state.schedule.dataScheduleEdit);
    const { cinemas, rooms, movies } = useSelector((state) => state.schedule);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        reset,
        setValue,
    } = useForm({});

    const selectedCinemaId = watch("cinemaId");
    const selectedMovieId = watch("movieId");
    const date = watch("date");
    const startTime = watch("startTime");

    useEffect(() => {
        let cinemaId = "";
        let date = null;
        if (!_.isEmpty(dataScheduleEdit)) {
            let foundRoom = rooms.find((room) => room.id === dataScheduleEdit.roomId);
            cinemaId = foundRoom.cinemaId;
            date = dayjs(dataScheduleEdit.startTime).startOf("day");
        }

        reset({
            cinemaId: cinemaId,
            roomId: dataScheduleEdit.roomId || "",
            movieId: dataScheduleEdit.movieId || "",
            date: date,
            startTime: dataScheduleEdit.startTime || null,
            endTime: dataScheduleEdit.endTime || null,
        });
    }, [dataScheduleEdit]);

    useEffect(() => {
        if (selectedMovieId) {
            let movie = movies.find((movie) => movie.id === selectedMovieId);
            let endTime = startTime + movie.duration * 60 * 1000;
            setValue("endTime", endTime);
        }
    }, [startTime]);

    const handleCloseScheduleModal = () => {
        setIsOpenScheduleModal(false);
        if (!_.isEmpty(dataScheduleEdit)) {
            dispatch(clearDataScheduleEdit());
        }
    };

    const handleSubmitScheduleForm = async (scheduleData) => {
        console.log("Data schedule submit: ", scheduleData);
        let movie = movies.find((movie) => movie.id === scheduleData.movieId);
        // Lấy giờ, phút, giây từ TimePicker
        const timeValue = dayjs(scheduleData.startTime);
        const hours = timeValue.hour();
        const minutes = timeValue.minute();
        const seconds = timeValue.second();

        // Kết hợp với ngày từ DatePicker
        scheduleData.startTime = dayjs(scheduleData.date)
            .hour(hours)
            .minute(minutes)
            .second(seconds)
            .valueOf();
        scheduleData.endTime = scheduleData.startTime + movie.duration * 60 * 1000;

        delete scheduleData.cinemaId;
        delete scheduleData.date;
        if (_.isEmpty(dataScheduleEdit)) {
            // create new schedule
            let result = await createNewScheduleAPI(scheduleData);
            if (result && result.status === 201) {
                toast.success("Tạo lịch chiếu thành công!");
                dispatch(clearDataScheduleEdit());
            }
        } else {
            // update schedule
            scheduleData.id = dataScheduleEdit.id;
            let result = await updateScheduleAPI(scheduleData);
            if (result && result.status === 200) {
                toast.success("Cập nhật lịch chiếu thành công!");
                dispatch(clearDataScheduleEdit());
            }
        }
        handleFetchSchedules();
        setIsOpenScheduleModal(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpenScheduleModal}
            onClose={handleCloseScheduleModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpenScheduleModal}>
                <Box sx={styleScheduleModal}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseScheduleModal}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            color: "grey.500",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography
                        id="user-form-title"
                        variant="h6"
                        component="h2"
                        mb={3}
                        fontWeight={600}
                    >
                        {_.isEmpty(dataScheduleEdit)
                            ? "Thêm lịch chiếu mới"
                            : "Chỉnh sửa lịch chiếu"}
                    </Typography>

                    <form onSubmit={handleSubmit(handleSubmitScheduleForm)}>
                        <Grid container rowSpacing={2.5} columnSpacing={3}>
                            <Grid item xs={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="cinemaId-label" error={!!errors.cinemaId}>
                                        Chọn cụm rạp*
                                    </InputLabel>
                                    <Controller
                                        name="cinemaId"
                                        control={control}
                                        rules={{ required: "Cụm rạp không được để trống!" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Chọn cụm rạp*"
                                                labelId="cinemaId-label"
                                                error={!!errors.cinemaId}
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
                                            </Select>
                                        )}
                                    />
                                    {errors.cinemaId && (
                                        <FormHelperText error>
                                            {errors.cinemaId?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="roomId-label" error={!!errors.roomId}>
                                        Chọn phòng*
                                    </InputLabel>
                                    <Controller
                                        name="roomId"
                                        control={control}
                                        rules={{ required: "Phòng không được để trống!" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Chọn phòng*"
                                                labelId="roomId-label"
                                                error={!!errors.roomId}
                                                disabled={!selectedCinemaId}
                                            >
                                                {rooms &&
                                                    rooms.length > 0 &&
                                                    rooms
                                                        .filter(
                                                            (room) =>
                                                                room.cinemaId === selectedCinemaId
                                                        )
                                                        .map((room, index) => {
                                                            return (
                                                                <MenuItem
                                                                    key={index}
                                                                    value={room.id}
                                                                >
                                                                    {room.roomName}
                                                                </MenuItem>
                                                            );
                                                        })}
                                            </Select>
                                        )}
                                    />
                                    {errors.roomId && (
                                        <FormHelperText error>
                                            {errors.roomId?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="movieId-label" error={!!errors.movieId}>
                                        Chọn phim*
                                    </InputLabel>
                                    <Controller
                                        name="movieId"
                                        control={control}
                                        rules={{ required: "Phim không được để trống!" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Chọn phim*"
                                                labelId="movieId-label"
                                                error={!!errors.movieId}
                                            >
                                                {movies &&
                                                    movies.map((movie, index) => {
                                                        return (
                                                            <MenuItem key={index} value={movie.id}>
                                                                {movie.movieName}
                                                            </MenuItem>
                                                        );
                                                    })}
                                            </Select>
                                        )}
                                    />
                                    {errors.movieId && (
                                        <FormHelperText error>
                                            {errors.movieId?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name="date"
                                        control={control}
                                        rules={{
                                            required: "Ngày chiếu không được để trống",
                                        }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <DatePicker
                                                label="Ngày chiếu"
                                                value={value ? dayjs(value) : null}
                                                format="DD/MM/YYYY"
                                                onChange={(date) =>
                                                    onChange(date ? date.valueOf() : null)
                                                }
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                        error: !!error,
                                                        helperText: error ? error.message : null,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name="startTime"
                                        control={control}
                                        defaultValue={null}
                                        render={({ field, fieldState: { error } }) => (
                                            <TimePicker
                                                {...field}
                                                label="Giờ bắt đầu"
                                                value={field.value ? dayjs(field.value) : null}
                                                onChange={(time) =>
                                                    field.onChange(time ? time.valueOf() : null)
                                                }
                                                disabled={!date}
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                        error: !!error,
                                                        helperText: error ? error.message : null,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name="endTime"
                                        control={control}
                                        defaultValue={null}
                                        render={({ field, fieldState: { error } }) => (
                                            <TimePicker
                                                {...field}
                                                label="Giờ kết thúc"
                                                value={field.value ? dayjs(field.value) : null}
                                                onChange={(time) =>
                                                    field.onChange(time ? time.valueOf() : null)
                                                }
                                                disabled
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                        error: !!error,
                                                        helperText: error ? error.message : null,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>

                        <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCloseScheduleModal}
                                sx={{
                                    px: 3,
                                }}
                            >
                                Hủy
                            </Button>
                            {_.isEmpty(dataScheduleEdit) ? (
                                <Button type="submit" variant="contained" color="primary">
                                    Thêm mới
                                </Button>
                            ) : (
                                <Button type="submit" variant="contained" color="warning">
                                    Cập nhật
                                </Button>
                            )}
                        </Stack>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
}

export default ScheduleModal;

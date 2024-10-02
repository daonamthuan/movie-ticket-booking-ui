import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgeLimits, clearMovieEditData } from "~/redux/slice/movieSlice";
import { createNewMovieAPI, updateMovieAPI } from "~/apis";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import _ from "lodash";

const styleMovieModal = {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1100,
    bgcolor: "background.paper",
    outline: "none",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
};

function MovieModal({ isOpenMovieModal, setIsOpenMovieModal, handleFetchMovies }) {
    const dispatch = useDispatch();
    const ageLimitArray = useSelector((state) => state.movie.ageLimitArray);
    const dataMovieEdit = useSelector((state) => state.movie.dataMovieEdit);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        reset,
    } = useForm({});
    const file = watch("image");

    useEffect(() => {
        reset({
            movieName: dataMovieEdit.movieName || "",
            category: dataMovieEdit.category || "",
            duration: dataMovieEdit.duration || null,
            directors: dataMovieEdit.directors || "",
            actors: dataMovieEdit.actors || "",

            ageLimit: dataMovieEdit.ageLimit || "",
            releaseDate: dataMovieEdit.releaseDate || null,
            movieFormat: dataMovieEdit.movieFormat || "",
            audioType: dataMovieEdit.audioType || "",
            description: dataMovieEdit.description || "",

            trailer: dataMovieEdit.trailer || "",
            status: dataMovieEdit.status || "",
            image: dataMovieEdit.image || null,
            image_old: dataMovieEdit.image || null,
        });
    }, [dataMovieEdit]);

    useEffect(() => {
        dispatch(fetchAgeLimits());
    }, []);

    const handleCloseMovieModal = () => {
        setIsOpenMovieModal(false);
        if (!_.isEmpty(dataMovieEdit)) {
            dispatch(clearMovieEditData());
        }
    };

    const handleSubmitMovieForm = async (movieData) => {
        if (_.isEmpty(dataMovieEdit)) {
            // create new movie
            delete movieData.image_old;
            let result = await createNewMovieAPI(movieData);
            if (result && result.status === 201) {
                toast.success("Tạo phim mới thành công!");
            }
        } else {
            // update movie
            movieData.id = dataMovieEdit.id;
            let result = await updateMovieAPI(movieData);
            if (result && result.status === 200) {
                toast.success("Cập nhật thông tin phim thành công!");
                dispatch(clearMovieEditData());
            }
        }
        handleFetchMovies();
        setIsOpenMovieModal(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpenMovieModal}
            onClose={handleCloseMovieModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpenMovieModal}>
                <Box sx={styleMovieModal}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseMovieModal}
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
                        {_.isEmpty(dataMovieEdit) ? "Thêm mới bộ phim" : "Chỉnh sửa bộ phim"}
                    </Typography>

                    <form onSubmit={handleSubmit(handleSubmitMovieForm)}>
                        <Grid container rowSpacing={2.5} columnSpacing={3}>
                            <Grid item xs={5}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Tên phim*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.movieName}
                                    {...register("movieName", {
                                        required: "Tên phim không được để trống!",
                                    })}
                                    helperText={errors.movieName?.message}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Thể loại*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.category}
                                    {...register("category", {
                                        required: "Thể loại không được để trống!",
                                    })}
                                    helperText={errors.category?.message}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    label="Thời lượng*"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.duration}
                                    InputProps={{ inputProps: { min: 0 } }}
                                    {...register("duration", {
                                        required: "Thời lượng không được để trống!",
                                    })}
                                    helperText={errors.duration?.message}
                                />
                            </Grid>

                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    label="Đạo diễn*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.directors}
                                    {...register("directors", {
                                        required: "Đạo diễn không được để trống!",
                                    })}
                                    helperText={errors.directors?.message}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Diễn viên*"
                                    type="tel"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.actors}
                                    {...register("actors", {
                                        required: "Diễn viên không được để trống!",
                                    })}
                                    helperText={errors.actors?.message}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="age-limit-label" error={!!errors.ageLimit}>
                                        Phân loại tuổi*
                                    </InputLabel>
                                    <Controller
                                        name="ageLimit"
                                        control={control}
                                        rules={{ required: "Phân loại tuổi không được để trống!" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Phân loại tuổi*"
                                                labelId="age-limit-label"
                                                error={!!errors.ageLimit}
                                            >
                                                {ageLimitArray &&
                                                    ageLimitArray.map((item, index) => {
                                                        return (
                                                            <MenuItem
                                                                key={index}
                                                                value={item.keyCode}
                                                            >
                                                                {item.keyCode}
                                                            </MenuItem>
                                                        );
                                                    })}
                                            </Select>
                                        )}
                                    />
                                    {errors.ageLimit && (
                                        <FormHelperText error>
                                            {errors.ageLimit?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name="releaseDate"
                                        control={control}
                                        rules={{
                                            required: "Ngày khởi chiếu không được để trống",
                                        }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <DatePicker
                                                label="Ngày khởi chiếu"
                                                value={value ? dayjs(value) : null}
                                                format="DD/MM/YYYY"
                                                onChange={(releaseDate) =>
                                                    onChange(
                                                        releaseDate ? releaseDate.valueOf() : null
                                                    )
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

                            <Grid item xs={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="format-label" error={!!errors.movieFormat}>
                                        Định dạng*
                                    </InputLabel>
                                    <Controller
                                        name="movieFormat"
                                        control={control}
                                        rules={{ required: "Định dạng phim không được để trống!" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Vai trò*"
                                                labelId="format-label"
                                                error={!!errors.movieFormat}
                                            >
                                                <MenuItem value={"2D"}>2D</MenuItem>
                                                <MenuItem value={"3D"}>3D</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errors.movieFormat && (
                                        <FormHelperText error>
                                            {errors.movieFormat?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="audio-label" error={!!errors.audioType}>
                                        Ngôn ngữ*
                                    </InputLabel>
                                    <Controller
                                        name="audioType"
                                        control={control}
                                        rules={{
                                            required: "Ngôn ngữ không được để trống!",
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Ngôn ngữ*"
                                                labelId="audio-label"
                                                error={!!errors.audioType}
                                            >
                                                <MenuItem value={"dubbed"}>Thuyết minh</MenuItem>
                                                <MenuItem value={"subtitled"}>Phụ đề</MenuItem>
                                                <MenuItem value={"both"}>Cả hai</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errors.audioType && (
                                        <FormHelperText error>
                                            {errors.audioType?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="status-label" error={!!errors.status}>
                                        Trạng thái chiếu*
                                    </InputLabel>
                                    <Controller
                                        name="status"
                                        control={control}
                                        rules={{
                                            required:
                                                "Trái thái chiếu của phim không được để trống!",
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Trạng thái chiếu*"
                                                labelId="status-label"
                                                error={!!errors.status}
                                            >
                                                <MenuItem value={"now-showing"}>
                                                    Đang chiếu
                                                </MenuItem>
                                                <MenuItem value={"coming-soon"}>Sắp chiếu</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errors.status && (
                                        <FormHelperText error>
                                            {errors.status?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Trailer URL*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.trailer}
                                    {...register("trailer", {
                                        required: "Trailer không được để trống!",
                                    })}
                                    helperText={errors.trailer?.message}
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <Controller
                                    name="image"
                                    control={control}
                                    render={({ field }) => (
                                        <Button
                                            component="label"
                                            variant="contained"
                                            startIcon={<CloudUploadIcon />}
                                            sx={{
                                                textTransform: "none",
                                                px: 3.5,
                                            }}
                                        >
                                            Tải poster
                                            <input
                                                width="200px"
                                                type="file"
                                                onChange={(event) => {
                                                    field.onChange(event.target.files[0]);
                                                }}
                                                style={{ display: "none" }}
                                            />
                                        </Button>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={2} container alignItems="center" paddingLeft={0}>
                                {file && (
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body1">{file.name}</Typography>
                                    </Box>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mô tả*"
                                    type="text"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    size="small"
                                    error={!!errors.description}
                                    {...register("description", {
                                        required: "Mô tả không được để trống!",
                                    })}
                                    helperText={errors.description?.message}
                                />
                            </Grid>
                        </Grid>

                        <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCloseMovieModal}
                                sx={{
                                    px: 3,
                                }}
                            >
                                Hủy
                            </Button>
                            {_.isEmpty(dataMovieEdit) ? (
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

export default MovieModal;

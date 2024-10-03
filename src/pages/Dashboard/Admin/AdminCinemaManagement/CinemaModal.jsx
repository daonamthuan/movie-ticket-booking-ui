import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearDataCinemaEdit } from "~/redux/slice/cinemaSlice";
import { toast } from "react-toastify";
import { createNewCinemaAPI, updateCinemaAPI } from "~/apis";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import FormHelperText from "@mui/material/FormHelperText";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import _ from "lodash";

const styleCinemaModal = {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    outline: "none",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
};

function CinemaModal({ isOpenCinemaModal, setIsOpenCinemaModal, handleFetchCinemas }) {
    const dispatch = useDispatch();
    const dataCinemaEdit = useSelector((state) => state.cinema.dataCinemaEdit);
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
            cinemaName: dataCinemaEdit.cinemaName || "",
            totalRooms: dataCinemaEdit.totalRooms || null,
            address: dataCinemaEdit.address || "",
            hotline: dataCinemaEdit.hotline || null,
            image: dataCinemaEdit.image || null,
            image_old: dataCinemaEdit.image || null,
        });
    }, [dataCinemaEdit]);

    const handleCloseCinemaModal = () => {
        setIsOpenCinemaModal(false);
        if (!_.isEmpty(dataCinemaEdit)) {
            dispatch(clearDataCinemaEdit());
        }
    };

    const handleSubmitCinemaForm = async (cinemaData) => {
        console.log("Data cinema submit: ", cinemaData);
        if (_.isEmpty(dataCinemaEdit)) {
            // create new cinema
            delete cinemaData.image_old;
            let result = await createNewCinemaAPI(cinemaData);
            if (result && result.status === 201) {
                toast.success("Tạo rạp chiếu phim thành công!");
                dispatch(clearDataCinemaEdit());
            }
        } else {
            // update cinema
            cinemaData.id = dataCinemaEdit.id;
            let result = await updateCinemaAPI(cinemaData);
            if (result && result.status === 200) {
                toast.success("Cập nhật thông tin rạp chiếu phim thành công!");
                dispatch(clearDataCinemaEdit());
            }
        }
        handleFetchCinemas();
        setIsOpenCinemaModal(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpenCinemaModal}
            onClose={handleCloseCinemaModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpenCinemaModal}>
                <Box sx={styleCinemaModal}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseCinemaModal}
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
                        {_.isEmpty(dataCinemaEdit) ? "Thêm rạp phim mới" : "Chỉnh sửa rạp phim"}
                    </Typography>

                    <form onSubmit={handleSubmit(handleSubmitCinemaForm)}>
                        <Grid container rowSpacing={2.5} columnSpacing={3}>
                            <Grid item xs={8}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Tên rạp chiếu*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.cinemaName}
                                    {...register("cinemaName", {
                                        required: "Tên rạp chiếu không được để trống!",
                                    })}
                                    helperText={errors.cinemaName?.message}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Số phòng*"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.totalRooms}
                                    {...register("totalRooms", {
                                        required: "Mô tả không được để trống!",
                                    })}
                                    helperText={errors.totalRooms?.message}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    label="Địa chỉ*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.address}
                                    {...register("address", {
                                        required: "Địa chỉ không được để trống!",
                                    })}
                                    helperText={errors.address?.message}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Hotline*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.hotline}
                                    {...register("hotline", {
                                        required: "Số hotline không được để trống!",
                                    })}
                                    helperText={errors.hotline?.message}
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
                                                px: 2.6,
                                            }}
                                        >
                                            Tải ảnh
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
                            <Grid
                                item
                                xs={2}
                                container
                                alignItems="center"
                                sx={{
                                    px: 0,
                                }}
                            >
                                {file && (
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body1">{file.name}</Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>

                        <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCloseCinemaModal}
                                sx={{
                                    px: 3,
                                }}
                            >
                                Hủy
                            </Button>
                            {_.isEmpty(dataCinemaEdit) ? (
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

export default CinemaModal;

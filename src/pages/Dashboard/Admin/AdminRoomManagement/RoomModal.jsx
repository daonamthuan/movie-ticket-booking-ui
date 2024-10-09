import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearDataRoomEdit } from "~/redux/slice/roomSlice";
import { createNewRoomAPI, updateRoomAPI } from "~/apis";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import _ from "lodash";

const styleRoomModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    maxHeight: "90vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    outline: "none",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
};

function RoomModal({ cinemaId, isOpenRoomModal, setIsOpenRoomModal, handleFetchCinemaInfo }) {
    const dispatch = useDispatch();
    const dataRoomEdit = useSelector((state) => state.room.dataRoomEdit);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        setValue,
    } = useForm({});
    const horizontalSeats = watch("horizontalSeats");
    const verticalSeats = watch("verticalSeats");
    let seatMap = watch("seatMap");
    let oldSeatMapRef = useRef(null);

    useEffect(() => {
        let horizontalSeats = null,
            verticalSeats = null,
            seatMap = null;
        if (!_.isEmpty(dataRoomEdit)) {
            seatMap = JSON.parse(dataRoomEdit.seatMap);
            horizontalSeats = seatMap[0].length;
            verticalSeats = seatMap.length;
        }

        reset({
            roomName: dataRoomEdit.roomName || "",
            cinemaId: dataRoomEdit.cinemaId || "",
            horizontalSeats: horizontalSeats,
            verticalSeats: verticalSeats,
            totalSeats: dataRoomEdit.totalSeats || 0,
            note: dataRoomEdit.note || "",
            seatMap: seatMap,
        });
    }, [dataRoomEdit]);

    useEffect(() => {
        if (!_.isEqual(seatMap, oldSeatMapRef.current)) {
            oldSeatMapRef.current = seatMap;
        } else if (_.isEqual(seatMap, oldSeatMapRef.current) && horizontalSeats && verticalSeats) {
            const seatMapArr = Array.from({ length: verticalSeats }, () =>
                Array.from({ length: horizontalSeats }, () => 1)
            );

            oldSeatMapRef.current = seatMapArr;
            setValue("seatMap", seatMapArr);
            setValue("totalSeats", horizontalSeats * verticalSeats);
        }

        console.log("Check seatMap 2: ", seatMap, " - oldSeatMap 2: ", oldSeatMapRef.current);
    }, [horizontalSeats, verticalSeats]);

    const countTotalSeats = (seatMap) => {
        let count = 0;
        for (let i = 0; i < seatMap.length; i++) {
            for (let j = 0; j < seatMap[i].length; j++) {
                if (seatMap[i][j] !== 0) {
                    count++;
                }
            }
        }

        return count;
    };

    const handleCloseRoomModal = () => {
        setIsOpenRoomModal(false);
        if (!_.isEmpty(dataRoomEdit)) {
            dispatch(clearDataRoomEdit());
        }
    };

    const handleSubmitRoomForm = async (roomData) => {
        roomData.seatMap = JSON.stringify(roomData.seatMap);
        delete roomData.horizontalSeats;
        delete roomData.verticalSeats;
        if (_.isEmpty(dataRoomEdit)) {
            // create new room
            roomData.cinemaId = cinemaId;
            roomData.totalSeats = countTotalSeats(seatMap);
            let result = await createNewRoomAPI(roomData);
            if (result && result.status === 201) {
                toast.success("Tạo rạp chiếu phim thành công!");
                dispatch(clearDataRoomEdit());
            }
        } else {
            // update room
            roomData.id = dataRoomEdit.id;
            roomData.totalSeats = countTotalSeats(seatMap);
            let result = await updateRoomAPI(roomData);
            if (result && result.status === 200) {
                toast.success("Cập nhật thông tin rạp chiếu phim thành công!");
                dispatch(clearDataRoomEdit());
            }
        }
        handleFetchCinemaInfo();
        setIsOpenRoomModal(false);
    };

    const getLetterFromIndex = (index) => {
        return String.fromCharCode(65 + index);
    };

    const getSeatColor = (value) => {
        switch (value) {
            case 0:
                return "#f5f5f5";
            case 1:
                return "#4eb84e";
            case 2:
                return "#e9053e";
        }
    };

    const handleSeatClick = (rowIndex, colIndex) => {
        seatMap[rowIndex][colIndex] = ++seatMap[rowIndex][colIndex] % 3;
        setValue("seatMap", seatMap);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpenRoomModal}
            onClose={handleCloseRoomModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpenRoomModal}>
                <Box sx={styleRoomModal}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseRoomModal}
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
                        {_.isEmpty(dataRoomEdit) ? "Thêm phòng chiếu mới" : "Chỉnh sửa phòng chiếu"}
                    </Typography>

                    <form onSubmit={handleSubmit(handleSubmitRoomForm)}>
                        <Grid container rowSpacing={2.5} columnSpacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Tên phòng chiếu*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.roomName}
                                    {...register("roomName", {
                                        required: "Tên phòng chiếu không được để trống!",
                                    })}
                                    helperText={errors.roomName?.message}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    label="Số ghế ngang*"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.horizontalSeats}
                                    {...register("horizontalSeats", {
                                        required: "Số ghế ngang không được để trống!",
                                    })}
                                    helperText={errors.horizontalSeats?.message}
                                    inputProps={{ min: 1, max: 15 }}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    label="Số ghế dọc*"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.verticalSeats}
                                    {...register("verticalSeats", {
                                        required: "Số ghế dọc không được để trống!",
                                    })}
                                    helperText={errors.verticalSeats?.message}
                                    inputProps={{ min: 1, max: 15 }}
                                />
                            </Grid>

                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    label="Ghi chú*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.note}
                                    {...register("note")}
                                    helperText={errors.note?.message}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Sức chứa*"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    // value={totalSeats}
                                    error={!!errors.totalSeats}
                                    {...register("totalSeats", {
                                        required: "Sức chứa không được để trống!",
                                    })}
                                    helperText={errors.totalSeats?.message}
                                />
                            </Grid>
                        </Grid>

                        {seatMap && (
                            <Box sx={{ width: "100%", mt: 4, border: "1px solid grey" }}>
                                <Box
                                    sx={{
                                        width: "65%",
                                        height: "5px",
                                        margin: "10px auto 40px",
                                        bgcolor: "rgba(60, 60, 60, 0.87)",
                                    }}
                                >
                                    <Typography
                                        component="div"
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: "16px",
                                            textAlign: "center",
                                            pt: 0.5,
                                        }}
                                    >
                                        Màn hình chiếu phim
                                    </Typography>
                                </Box>

                                <Box sx={{ m: 3 }}>
                                    {seatMap.length > 0 &&
                                        seatMap.map((row, rowIndex) => (
                                            <Box
                                                key={rowIndex}
                                                sx={{
                                                    display: "flex",
                                                    gap: 1,
                                                    justifyContent: "center",
                                                    mb: 1,
                                                }}
                                            >
                                                <Typography
                                                    component="div"
                                                    sx={{
                                                        width: "20px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {getLetterFromIndex(rowIndex)}
                                                </Typography>
                                                {row.map((seat, colIndex) => (
                                                    <Box
                                                        key={colIndex}
                                                        sx={{
                                                            width: 30,
                                                            height: 30,
                                                            backgroundColor: getSeatColor(seat),
                                                            border: "1px solid #d9d9d9",
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            fontSize: "14px",
                                                        }}
                                                        onClick={() =>
                                                            handleSeatClick(rowIndex, colIndex)
                                                        }
                                                    >
                                                        {colIndex + 1}
                                                    </Box>
                                                ))}
                                            </Box>
                                        ))}
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 4,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mb: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                border: "1px solid #d9d9d9",
                                                backgroundColor: "#4eb84e",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <Typography component="div" fontSize={"14px"}>
                                            Ghế đơn
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                border: "1px solid #d9d9d9",
                                                backgroundColor: "#e9053e",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <Typography component="div" fontSize={"14px"}>
                                            Ghế đôi
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                border: "1px solid #d9d9d9",
                                                backgroundColor: "##f5f5f5",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <Typography component="div" fontSize={"14px"}>
                                            Lối đi
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )}

                        <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCloseRoomModal}
                                sx={{
                                    px: 3,
                                }}
                            >
                                Hủy
                            </Button>
                            {_.isEmpty(dataRoomEdit) ? (
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

export default RoomModal;

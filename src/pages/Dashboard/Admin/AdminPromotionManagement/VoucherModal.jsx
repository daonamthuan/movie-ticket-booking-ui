import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearDataVoucherEdit } from "~/redux/slice/voucherSlice";
import { toast } from "react-toastify";
import { createNewVoucherAPI, updateVoucherAPI } from "~/apis";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
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
import Box from "@mui/material/Box";
import _ from "lodash";
import dayjs from "dayjs";

const styleVoucherModal = {
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

function VoucherModal({ isOpenVoucherModal, setIsOpenVoucherModal, handleFetchVouchers }) {
    const dispatch = useDispatch();
    const dataVoucherEdit = useSelector((state) => state.voucher.dataVoucherEdit);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({});

    useEffect(() => {
        reset({
            voucherCode: dataVoucherEdit.voucherCode || "",
            amount: dataVoucherEdit.amount || null,
            status: dataVoucherEdit.status || "",
            validFrom: dataVoucherEdit.validFrom || null,
            validUntil: dataVoucherEdit.validUntil || null,
        });
    }, [dataVoucherEdit]);

    const handleCloseVoucherModal = () => {
        setIsOpenVoucherModal(false);
        if (!_.isEmpty(dataVoucherEdit)) {
            dispatch(clearDataVoucherEdit());
        }
    };

    const handleSubmitVoucherForm = async (voucherData) => {
        console.log("Data voucher submit: ", voucherData);
        if (_.isEmpty(dataVoucherEdit)) {
            // create new voucher
            let result = await createNewVoucherAPI(voucherData);
            if (result && result.status === 201) {
                toast.success("Tạo voucher mới thành công!");
                dispatch(clearDataVoucherEdit());
            }
        } else {
            // update voucher
            voucherData.id = dataVoucherEdit.id;
            let result = await updateVoucherAPI(voucherData);
            if (result && result.status === 200) {
                toast.success("Cập nhật thông tin voucher phim thành công!");
                dispatch(clearDataVoucherEdit());
            }
        }
        handleFetchVouchers();
        setIsOpenVoucherModal(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpenVoucherModal}
            onClose={handleCloseVoucherModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpenVoucherModal}>
                <Box sx={styleVoucherModal}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseVoucherModal}
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
                        {_.isEmpty(dataVoucherEdit) ? "Thêm voucher mới" : "Chỉnh sửa voucher"}
                    </Typography>

                    <form onSubmit={handleSubmit(handleSubmitVoucherForm)}>
                        <Grid container rowSpacing={2.5} columnSpacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Mã giảm giá*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.voucherCode}
                                    {...register("voucherCode", {
                                        required: "Mã giảm giá không được để trống!",
                                    })}
                                    helperText={errors.voucherCode?.message}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Giá trị*"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.amount}
                                    {...register("amount", {
                                        required: "Giá trị voucher được để trống!",
                                    })}
                                    helperText={errors.amount?.message}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="format-label" error={!!errors.status}>
                                        Tình trạng*
                                    </InputLabel>
                                    <Controller
                                        name="status"
                                        control={control}
                                        rules={{ required: "Tình trạng không được để trống!" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Tình trạng*"
                                                labelId="format-label"
                                                error={!!errors.status}
                                            >
                                                <MenuItem value={"UNUSED"}>Chưa sử dụng</MenuItem>
                                                <MenuItem value={"USED"}>Đã sử dụng</MenuItem>
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

                            <Grid item xs={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name="validFrom"
                                        control={control}
                                        rules={{
                                            required: "Ngày hiệu lực không được để trống",
                                        }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <DatePicker
                                                label="Ngày hiệu lực"
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
                                        name="validUntil"
                                        control={control}
                                        rules={{
                                            required: "Ngày hết hạn không được để trống",
                                        }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <DatePicker
                                                label="Ngày hết hạn"
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
                        </Grid>

                        <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCloseVoucherModal}
                                sx={{
                                    px: 3,
                                }}
                            >
                                Hủy
                            </Button>
                            {_.isEmpty(dataVoucherEdit) ? (
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

export default VoucherModal;

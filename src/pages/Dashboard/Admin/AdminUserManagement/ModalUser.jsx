import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";
import { createNewUserAPI, updateUserAPI } from "~/apis";
import { toast } from "react-toastify";
import emitter from "~/utils/emitter";
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

const styleUserModal = {
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

function ModalUser({
    isOpenUserModal,
    setIsOpenUserModal,
    isCreateNewUser,
    dataUserEdit,
    setDataUserEdit,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        reset,
    } = useForm({});
    const file = watch("image");

    const { genders, roles, memberships } = useSelector((state) => state.user);

    useEffect(() => {
        reset({
            email: dataUserEdit.email || "",
            password: dataUserEdit.email || "",
            firstName: dataUserEdit.firstName || "",
            lastName: dataUserEdit.lastName || "",
            phoneNumber: dataUserEdit.phoneNumber || "",
            gender: dataUserEdit.gender || "",
            role: dataUserEdit.role || "",
            membership: dataUserEdit.membership || "",
            birthday: dataUserEdit.birthday || null,
            image: dataUserEdit.image || null,
        });
    }, [dataUserEdit]);

    const handleCloseUserModal = () => {
        setIsOpenUserModal(false);
        setDataUserEdit({});
    };

    const handleSubmitCreateUser = async (data) => {
        console.log("User submit data: ", data);
        if (!data.image) delete data.image;
        if (isCreateNewUser) {
            let response = await createNewUserAPI(data);
            if (response && response.status === 201) {
                toast.success("Tạo người dùng mới thành công!");
            }
        } else {
            delete data.password;
            let response = await updateUserAPI(data);
            if (response && response.status === 200) {
                toast.success("Cập nhật thông tin người dùng thành công");
            }
        }
        handleCloseUserModal();
        emitter.emit("refreshTableUserData");
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpenUserModal}
            onClose={handleCloseUserModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpenUserModal}>
                <Box sx={styleUserModal}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseUserModal}
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
                        Thêm mới người dùng
                    </Typography>

                    <form onSubmit={handleSubmit(handleSubmitCreateUser)}>
                        <Grid container rowSpacing={2.5} columnSpacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    disabled={!isCreateNewUser}
                                    label="Email*"
                                    type="email"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.email}
                                    {...register("email", {
                                        required: "Email không được để trống!",
                                    })}
                                    helperText={errors.email?.message}
                                />
                            </Grid>

                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    disabled={!isCreateNewUser}
                                    label="Mật khẩu*"
                                    type="password"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.password}
                                    {...register("password", {
                                        required: "Mật khẩu không được để trống!",
                                    })}
                                    helperText={errors.password?.message}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Họ và tên đệm*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.lastName}
                                    {...register("lastName", {
                                        required: "Họ và tên đệm không được để trống!",
                                    })}
                                    helperText={errors.lastName?.message}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Tên*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.firstName}
                                    {...register("firstName", {
                                        required: "Tên không được để trống!",
                                    })}
                                    helperText={errors.firstName?.message}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Số điện thoại*"
                                    type="tel"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.phoneNumber}
                                    {...register("phoneNumber", {
                                        required: "Số điện thoại không được để trống!",
                                    })}
                                    helperText={errors.phoneNumber?.message}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="gender-label" error={!!errors.gender}>
                                        Giới tính*
                                    </InputLabel>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        rules={{ required: "Giới tính không được để trống!" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Giới tính*"
                                                labelId="gender-label"
                                                error={!!errors.gender}
                                            >
                                                {genders &&
                                                    genders.map((gender, index) => {
                                                        return (
                                                            <MenuItem
                                                                key={index}
                                                                value={gender.keyCode}
                                                            >
                                                                {gender.value}
                                                            </MenuItem>
                                                        );
                                                    })}
                                            </Select>
                                        )}
                                    />
                                    {errors.gender && (
                                        <FormHelperText error>
                                            {errors.gender?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="role-label" error={!!errors.role}>
                                        Vai trò*
                                    </InputLabel>
                                    <Controller
                                        name="role"
                                        control={control}
                                        rules={{ required: "Vai trò không được để trống!" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Vai trò*"
                                                labelId="role-label"
                                                error={!!errors.role}
                                            >
                                                {roles &&
                                                    roles.map((role, index) => {
                                                        return (
                                                            <MenuItem
                                                                key={index}
                                                                value={role.keyCode}
                                                            >
                                                                {role.value}
                                                            </MenuItem>
                                                        );
                                                    })}
                                            </Select>
                                        )}
                                    />
                                    {errors.role && (
                                        <FormHelperText error>
                                            {errors.role?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="membership-label" error={!!errors.membership}>
                                        Hạng thành viên*
                                    </InputLabel>
                                    <Controller
                                        name="membership"
                                        control={control}
                                        rules={{
                                            required: "Hạng thành viên không được để trống!",
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Hạng thành viên*"
                                                labelId="membership-label"
                                                error={!!errors.membership}
                                            >
                                                {memberships &&
                                                    memberships.map((membership, index) => {
                                                        return (
                                                            <MenuItem
                                                                key={index}
                                                                value={membership.keyCode}
                                                            >
                                                                {membership.value}
                                                            </MenuItem>
                                                        );
                                                    })}
                                            </Select>
                                        )}
                                    />
                                    {errors.membership && (
                                        <FormHelperText error>
                                            {errors.membership?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name="birthday"
                                        control={control}
                                        rules={{
                                            required: "Ngày tháng năm sinh không được để trống",
                                        }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <DatePicker
                                                label="Ngày sinh"
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

                            <Grid item xs={2.4}>
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
                                            }}
                                        >
                                            Tải ảnh lên
                                            <input
                                                width="200px"
                                                type="file"
                                                onChange={(event) => {
                                                    field.onChange(event.target.files[0]); // Cập nhật giá trị cho react-hook-form
                                                }}
                                                style={{ display: "none" }} // Ẩn input file
                                            />
                                        </Button>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={4} container alignItems="center" paddingLeft={0}>
                                {file && (
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body1">{file.name}</Typography>{" "}
                                    </Box>
                                )}
                            </Grid>
                        </Grid>

                        <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCloseUserModal}
                                sx={{
                                    px: 3,
                                }}
                            >
                                Hủy
                            </Button>
                            {isCreateNewUser ? (
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

export default ModalUser;

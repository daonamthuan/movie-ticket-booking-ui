import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { fetchGenderAPI, createNewUserAPI } from "~/apis";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CineFastLogo from "~/assets/cinefast-logo.png";
import { Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import dayjs from "dayjs";

function Register() {
    const navigate = useNavigate();
    let [genders, setGenders] = useState(null);
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
        const fetchGenderData = async () => {
            let response = await fetchGenderAPI();
            setGenders(response.data);
        };

        fetchGenderData();
    }, []);

    const submitRegister = async (data) => {
        data.role = "CUSTOMER";
        data.membership = "BRONZE";
        let response = await createNewUserAPI(data);
        if (response && response.status === 201) {
            toast.success("Tạo tài khoản thành công! \nTự tới trang đăng nhập trong 5 giây.");

            setTimeout(() => {
                navigate("/login");
            }, 5000);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                alignItems: "center",
                justifyContent: "center",
                background: 'url("src/assets/login-bg-img.jpg")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.4)",
            }}
        >
            <form onSubmit={handleSubmit(submitRegister)}>
                <Zoom in={true} style={{ transitionDelay: "200ms" }}>
                    <MuiCard
                        sx={{
                            minWidth: 500,
                            maxWidth: 500,
                            p: "0.5em 0",
                            borderRadius: 2,
                        }}
                    >
                        <Box sx={{ width: "200px", bgcolor: "white", margin: "5px auto 0" }}>
                            <img src={CineFastLogo} width="100%" />
                        </Box>

                        <Box sx={{ padding: "0 1em 1em 1em" }}>
                            <Grid container rowSpacing={2.5} columnSpacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        fullWidth
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

                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
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

                                <Grid item xs={6}>
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

                                <Grid item xs={6}>
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

                                <Grid item xs={6}>
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

                                <Grid item xs={6}>
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

                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Controller
                                            name="birthday"
                                            control={control}
                                            rules={{
                                                required: "Ngày sinh không được để trống",
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
                                                            helperText: error
                                                                ? error.message
                                                                : null,
                                                        },
                                                    }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={3.8}>
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
                                                        field.onChange(event.target.files[0]);
                                                    }}
                                                    style={{ display: "none" }} // Ẩn input file
                                                />
                                            </Button>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} container alignItems="center" paddingLeft={0}>
                                    {file && (
                                        <Box display="flex" alignItems="center">
                                            <Typography variant="body1">{file.name}</Typography>{" "}
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>

                        <CardActions sx={{ padding: "0 1em 2em 1em", mt: 1 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                            >
                                ĐĂNG KÝ
                            </Button>
                        </CardActions>
                    </MuiCard>
                </Zoom>
            </form>
        </Box>
    );
}

export default Register;

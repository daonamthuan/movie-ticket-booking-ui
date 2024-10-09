import Button from "@mui/material/Button";
import { useEffect } from "react";
import { Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Zoom from "@mui/material/Zoom";
import Alert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import CineFastLogo from "~/assets/cinefast-logo.png";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { handleLoginAPI } from "~/apis";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Default value of register: ", getValues());
    }, []);

    useEffect(() => {
        console.log("Check render: ", getValues());
    });

    const submitLogIn = async (data) => {
        const res = await handleLoginAPI(data);

        console.log("Response submit data: ", res.data);
        const userInfo = {
            id: res.data.id,
            email: res.data.email,
        };

        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        navigate("/dashboard");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                alignItems: "center",
                justifyContent: "flex-start",
                background: 'url("src/assets/login-bg-img.jpg")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.4)",
            }}
        >
            <form onSubmit={handleSubmit(submitLogIn)}>
                <Zoom in={true} style={{ transitionDelay: "200ms" }}>
                    <MuiCard
                        sx={{
                            minWidth: 380,
                            maxWidth: 380,
                            marginTop: "8.6em",
                            p: "0.5em 0",
                            borderRadius: 2,
                        }}
                    >
                        <Box sx={{ width: "200px", bgcolor: "white", margin: "5px auto 0" }}>
                            <img src={CineFastLogo} width="100%" />
                        </Box>

                        <Box sx={{ padding: "0 1em 1em 1em" }}>
                            <Box sx={{ marginTop: "1.2em" }}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Email..."
                                    type="email"
                                    variant="outlined"
                                    error={!!errors.email}
                                    {...register("email", {
                                        required: "Email không được để trống!",
                                    })}
                                />
                                {errors.email && (
                                    <Alert
                                        severity="error"
                                        sx={{
                                            mt: "0.7em",
                                            ".MuiAlert-message": { overflow: "hidden" },
                                        }}
                                    >
                                        {errors.email.message}
                                    </Alert>
                                )}
                            </Box>

                            <Box sx={{ marginTop: "1em" }}>
                                <TextField
                                    fullWidth
                                    label="Mật khẩu..."
                                    type="password"
                                    variant="outlined"
                                    error={!!errors.password} // chuyen doi sang dang boolean
                                    {...register("password", {
                                        required: "Mật khẩu không được để trống!",
                                    })}
                                />
                                {errors.password && (
                                    <Alert
                                        severity="error"
                                        sx={{
                                            mt: "0.7em",
                                            ".MuiAlert-message": { overflow: "hidden" },
                                        }}
                                    >
                                        {errors.password.message}
                                    </Alert>
                                )}
                            </Box>
                        </Box>
                        <CardActions sx={{ padding: "0 1em 2em 1em", mt: 1 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                            >
                                ĐĂNG NHẬP
                            </Button>
                        </CardActions>
                    </MuiCard>
                </Zoom>
            </form>
        </Box>
    );
}

export default Login;

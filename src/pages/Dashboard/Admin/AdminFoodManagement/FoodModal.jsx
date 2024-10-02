import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearFoodEditData } from "~/redux/slice/foodSlice";
import { formatVND } from "~/utils/helper";
import { toast } from "react-toastify";
import { createNewFoodAPI, updateFoodAPI } from "~/apis";
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

const styleFoodModal = {
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

function FoodModal({ isOpenFoodModal, setIsOpenFoodModal, handleFetchFoods }) {
    const [displayPrice, setDisplayPrice] = useState("");
    const [hasError, setHasError] = useState(false);
    const dispatch = useDispatch();
    const dataFoodEdit = useSelector((state) => state.food.dataFoodEdit);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        reset,
        setValue,
        getValues,
    } = useForm({});
    const file = watch("image");

    useEffect(() => {
        reset({
            foodName: dataFoodEdit.foodName || "",
            price: dataFoodEdit.price || "",
            description: dataFoodEdit.description || "",
            image: dataFoodEdit.image || null,
            image_old: dataFoodEdit.image || null,
        });
        if (dataFoodEdit.price) {
            setDisplayPrice(formatVND(dataFoodEdit.price));
        }
    }, [dataFoodEdit]);

    const handlePriceChange = (event) => {
        let rawValue = event.target.value;
        if (rawValue.length > 1) {
            if (!rawValue.includes("đ") || !rawValue.includes(" ")) {
                rawValue = rawValue.replace(/[.\sđ]/g, "");
                rawValue = rawValue.substring(0, rawValue.length - 1);
            } else {
                rawValue = rawValue.replace(/[.\sđ]/g, "");
            }
        }
        setDisplayPrice(formatVND(rawValue));
        setValue("price", rawValue);
    };

    const handleCloseFoodModal = () => {
        setIsOpenFoodModal(false);
        setDisplayPrice();
        if (!_.isEmpty(dataFoodEdit)) {
            dispatch(clearFoodEditData());
        }
    };

    const handleSubmitFoodForm = async (foodData) => {
        console.log("submit data: ", foodData);
        console.log("dataFoodEdit: ", dataFoodEdit);
        const priceValue = getValues("price");
        if (!priceValue) {
            setHasError(true);
            return;
        } else {
            setHasError(false);
        }

        if (_.isEmpty(dataFoodEdit)) {
            // create new food
            delete foodData.image_old;
            let result = await createNewFoodAPI(foodData);
            if (result && result.status === 201) {
                toast.success("Tạo đồ ăn mới thành công!");
            }
        } else {
            // update food
            foodData.id = dataFoodEdit.id;
            console.log("Check foodData update: ", foodData);
            let result = await updateFoodAPI(foodData);
            if (result && result.status === 200) {
                toast.success("Cập nhật thông tin đồ ăn thành công!");
                dispatch(clearFoodEditData());
            }
        }
        handleFetchFoods();
        setIsOpenFoodModal(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpenFoodModal}
            onClose={handleCloseFoodModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpenFoodModal}>
                <Box sx={styleFoodModal}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseFoodModal}
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
                        {_.isEmpty(dataFoodEdit) ? "Thêm mới dồ ăn" : "Chỉnh sửa đồ ăn"}
                    </Typography>

                    <form onSubmit={handleSubmit(handleSubmitFoodForm)}>
                        <Grid container rowSpacing={2.5} columnSpacing={3}>
                            <Grid item xs={8}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Tên đồ ăn*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.foodName}
                                    {...register("foodName", {
                                        required: "Tên đồ ăn không được để trống!",
                                    })}
                                    helperText={errors.foodName?.message}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Giá tiền*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    value={displayPrice}
                                    onChange={handlePriceChange}
                                    error={hasError}
                                />
                                {hasError && (
                                    <FormHelperText error>
                                        Giá tiền không được để trống
                                    </FormHelperText>
                                )}
                            </Grid>

                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    label="Mô tả*"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.description}
                                    {...register("description", {
                                        required: "Mô tả không được để trống!",
                                    })}
                                    helperText={errors.description?.message}
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
                                onClick={handleCloseFoodModal}
                                sx={{
                                    px: 3,
                                }}
                            >
                                Hủy
                            </Button>
                            {_.isEmpty(dataFoodEdit) ? (
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

export default FoodModal;

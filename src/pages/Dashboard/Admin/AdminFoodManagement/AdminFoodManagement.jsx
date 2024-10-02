import { useState, useEffect } from "react";
import { fetchFoodsAPI } from "~/apis";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import FoodCard from "./FoodCard";
import FoodModal from "./FoodModal";

function AdminFoodManagement() {
    const [foods, setFoods] = useState([]);
    const [isOpenFoodModal, setIsOpenFoodModal] = useState(false);

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        let response = await fetchFoodsAPI();
        setFoods(response.data);
    };

    const handleFetchFoods = () => {
        fetchFoods();
    };

    const handleOpenFoodModal = () => {
        setIsOpenFoodModal(true);
    };

    return (
        <>
            <Box sx={{ bgcolor: "background.paper", p: "20px 30px", borderRadius: "20px" }}>
                <Typography
                    sx={{
                        mb: 1.5,
                        fontSize: "18px",
                        fontWeight: 600,
                        textAlign: "center",
                        color: "#005792",
                    }}
                >
                    QUẢN LÝ ĐỒ ĂN, THỨC UỐNG
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 3 }}>
                        <Button
                            onClick={handleOpenFoodModal}
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
                            Thêm đồ ăn mới
                        </Button>
                    </Box>
                    <Grid container spacing={2}>
                        {foods &&
                            foods.length > 0 &&
                            foods.map((food, index) => {
                                return (
                                    <Grid item xs={6} key={index}>
                                        <FoodCard
                                            foodInfo={food}
                                            setIsOpenFoodModal={setIsOpenFoodModal}
                                            handleFetchFoods={handleFetchFoods}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                </Box>
            </Box>
            <FoodModal
                isOpenFoodModal={isOpenFoodModal}
                setIsOpenFoodModal={setIsOpenFoodModal}
                handleFetchFoods={handleFetchFoods}
            />
        </>
    );
}

export default AdminFoodManagement;

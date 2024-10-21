import { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Button, IconButton } from "@mui/material";
import { formatVND } from "~/utils/helper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function FoodCard({ food, handleSetSelectedFoods }) {
    const [quantity, setQuantity] = useState(0);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
        handleSetSelectedFoods(food, quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            handleSetSelectedFoods(food, quantity - 1);
        }
    };

    return (
        <Card sx={{ maxWidth: 250, width: "100%" }}>
            <CardMedia component="img" width={"200px"} image={food.image} alt={food.foodName} />
            <CardContent sx={{ px: 2 }}>
                <Box sx={{ minHeight: "75px" }}>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontSize: "18px", color: "#333" }}
                    >
                        {food.foodName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {food.description}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: "18px",
                            fontFamily: "Be VietNam Pro",
                            fontWeight: 600,
                            color: "#337ab7",
                            mt: 1,
                            mb: 0.5,
                        }}
                    >
                        {formatVND(food.price)}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <IconButton color="primary" onClick={handleDecrease} sx={{ p: 0 }}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ mx: 1 }}>
                            {quantity}
                        </Typography>
                        <IconButton color="primary" onClick={handleIncrease} sx={{ p: 0 }}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

function FoodMenu({ foods, handleSetSelectedFoods }) {
    return (
        <Box
            sx={{
                width: "70%",
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "space-between",
                borderRadius: "15px",
            }}
        >
            {foods &&
                foods.length > 0 &&
                foods.map((food, index) => (
                    <FoodCard
                        key={index}
                        food={food}
                        handleSetSelectedFoods={handleSetSelectedFoods}
                    />
                ))}
        </Box>
    );
}

export default FoodMenu;

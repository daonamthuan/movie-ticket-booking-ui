import { useDispatch } from "react-redux";
import { setDataFoodEdit } from "~/redux/slice/foodSlice";
import { formatVND, getFileNameFromPath } from "~/utils/helper";
import { deleteFoodAPI } from "~/apis";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function FoodCard({ foodInfo, setIsOpenFoodModal, handleFetchFoods }) {
    const dispatch = useDispatch();

    const handleEditFood = async (foodInfo) => {
        console.log("handle Edit Food: ", foodInfo);
        dispatch(setDataFoodEdit(foodInfo));
        setIsOpenFoodModal(true);
    };

    const handleDeleteFood = async (foodInfo) => {
        let publicId = getFileNameFromPath(foodInfo.image);
        let response = await deleteFoodAPI(foodInfo.id, publicId);
        if (response && response.status === 200) {
            toast.success("Xóa đồ ăn thành công!");
            handleFetchFoods();
        }
    };

    return (
        <Card
            sx={{
                width: "100%",
                display: "flex",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
        >
            <CardMedia
                component="img"
                sx={{ width: 120 }}
                image={foodInfo.image}
                alt="Live from space album cover"
            />
            <Box sx={{ width: "60%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", px: 2, py: 1.25 }}>
                    <Typography component="div" variant="h6">
                        {foodInfo.foodName}
                    </Typography>
                    <Typography component="div" sx={{ fontSize: "14px" }}>
                        {formatVND(foodInfo.price)}
                    </Typography>
                    <Typography component="div" sx={{ color: "text.secondary", fontSize: "14px" }}>
                        {foodInfo.description}
                    </Typography>
                </CardContent>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <IconButton
                    onClick={() => handleEditFood(foodInfo)}
                    aria-label="edit"
                    sx={{ color: "primary.main" }}
                >
                    <EditIcon sx={{ fontSize: 26 }} />
                </IconButton>
                <IconButton
                    onClick={() => handleDeleteFood(foodInfo)}
                    aria-label="delete"
                    sx={{ color: "red" }}
                >
                    <DeleteIcon sx={{ fontSize: 26 }} />
                </IconButton>
            </Box>
        </Card>
    );
}

export default FoodCard;

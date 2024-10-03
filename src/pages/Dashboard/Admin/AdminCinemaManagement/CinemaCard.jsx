import { useDispatch } from "react-redux";
import { setDataCinemaEdit } from "~/redux/slice/cinemaSlice";
import { deleteCinemaAPI } from "~/apis";
import { getFileNameFromPath } from "~/utils/helper";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function CinemaCard({ cinemaInfo, setIsOpenCinemaModal, handleFetchCinemas }) {
    const dispatch = useDispatch();

    const handleEditCinema = async (cinemaInfo) => {
        console.log("handle Edit Cinema: ", cinemaInfo);
        dispatch(setDataCinemaEdit(cinemaInfo));
        setIsOpenCinemaModal(true);
    };

    const handleDeleteCinema = async (cinemaInfo) => {
        let publicId = getFileNameFromPath(cinemaInfo.image);
        let response = await deleteCinemaAPI(cinemaInfo.id, publicId);
        if (response && response.status === 200) {
            toast.success("Xóa rạp chiếu phim thành công!");
            handleFetchCinemas();
        }
    };

    return (
        <Card sx={{ maxWidth: 345, boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={cinemaInfo.image}
                    alt="green iguana"
                />
                <CardContent sx={{ py: 1, height: 139 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {cinemaInfo.cinemaName}
                    </Typography>
                    <Typography component="div" sx={{ color: "text.secondary", fontSize: "14px" }}>
                        Số phòng: {cinemaInfo.totalRooms}
                    </Typography>
                    <Typography component="div" sx={{ color: "text.secondary", fontSize: "14px" }}>
                        Hotline: {cinemaInfo.hotline}
                    </Typography>
                    <Typography component="div" sx={{ color: "text.secondary", fontSize: "14px" }}>
                        Địa chỉ: {cinemaInfo.address}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: "flex", justifyContent: "space-between", px: 2, pt: 0 }}>
                <Button size="small" color="primary" sx={{ px: 0 }}>
                    Xem chi tiết
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <IconButton
                        onClick={() => handleEditCinema(cinemaInfo)}
                        aria-label="edit"
                        sx={{ color: "primary.main" }}
                    >
                        <EditIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteCinema(cinemaInfo)}
                        aria-label="delete"
                        sx={{ color: "red" }}
                    >
                        <DeleteIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    );
}

export default CinemaCard;

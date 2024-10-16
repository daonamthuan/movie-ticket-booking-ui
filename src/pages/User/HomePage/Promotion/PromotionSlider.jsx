import Slider from "react-slick";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

function NextArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "40%",
                right: "10px",
                transform: "translateY(-50%)",
                zIndex: 1,
                background: "white",
                borderRadius: "50%",
                boxShadow: 2, // Thêm bóng cho nút
            }}
        >
            <ArrowForward sx={{ fontSize: 30 }} /> {/* Thay đổi kích thước icon */}
        </IconButton>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "40%",
                left: "10px",
                transform: "translateY(-50%)",
                zIndex: 1,
                background: "white",
                borderRadius: "50%",
                boxShadow: 2, // Thêm bóng cho nút
            }}
        >
            <ArrowBack sx={{ fontSize: 30 }} /> {/* Thay đổi kích thước icon */}
        </IconButton>
    );
}
function PromotionCard({ promotionInfo }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ maxWidth: 290, bgcolor: "transparent", boxShadow: "none" }}>
                <CardMedia
                    sx={{ height: 180 }}
                    image={promotionInfo.image}
                    title={promotionInfo.title}
                />
                <CardContent sx={{ height: "95px", px: 0, py: 1 }}>
                    <Typography
                        gutterBottom
                        component="div"
                        sx={{
                            fontFamily: "Be Vietnam Pro",
                            fontWeight: 600,
                            color: "#337ab7",
                            fontSize: "15px",
                            width: "260px",
                            textTransform: "capitalize",
                        }}
                    >
                        {promotionInfo.title}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

function PromotionSlider({ promotions }) {
    var settings = {
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        // <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Slider {...settings}>
            {promotions &&
                promotions.length > 0 &&
                promotions.map((promotion, index) => (
                    <PromotionCard key={index} promotionInfo={promotion} />
                ))}
        </Slider>
        // </Box>
    );
}

export default PromotionSlider;

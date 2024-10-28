import { useNavigate } from "react-router-dom";
import emitter from "~/utils/emitter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { formatVND } from "~/utils/helper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const theme = createTheme({
    palette: {
        background: {
            paper: "#fff",
        },
        text: {
            primary: "#173A5E",
            secondary: "#46505A",
        },
        action: {
            active: "#001E3C",
        },
        success: {
            main: "#009688", // Thêm thuộc tính `main`
            dark: "#00796b",
        },
    },
    typography: {
        fontSize: 14,
        fontWeightMedium: 500,
    },
});

function SummaryCard({ cardInfo }) {
    const navigate = useNavigate();

    const handleShowDetails = (option) => {
        emitter.emit("updateSelectedSideBar", { option: option });
        navigate(`/dashboard/${option}`);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    width: 270,
                    minWidth: 100,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    px: 2.5,
                    py: 1.5,
                }}
            >
                <Box sx={{ color: "text.secondary", fontSize: 14 }}>{cardInfo.title}</Box>
                <Box sx={{ color: "text.primary", fontSize: 28, fontWeight: "medium" }}>
                    {cardInfo.name === "statistics" ? formatVND(cardInfo.metric) : cardInfo.metric}
                </Box>
                <Box
                    sx={{
                        color: "success.dark",
                        display: "inline",
                        fontWeight: "bold",
                        fontSize: 14,
                    }}
                >
                    {cardInfo.growth > 0 ? `+${cardInfo.growth}% ` : `${cardInfo.growth}% `}
                </Box>
                <Box sx={{ color: "text.secondary", display: "inline", fontSize: 14, mt: 0 }}>
                    so với tuần trước
                </Box>
                <Button
                    onClick={() => handleShowDetails(cardInfo.name)}
                    variant="text"
                    color="primary"
                    sx={{ fontSize: 14, mt: 0.5, p: 0 }}
                >
                    Xem chi tiết
                </Button>
            </Box>
        </ThemeProvider>
    );
}

export default SummaryCard;

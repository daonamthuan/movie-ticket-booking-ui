import { useNavigate } from "react-router-dom";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import Link from "@mui/material/Link";

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
            dark: "#009688",
        },
    },
});

function SummaryCard({ cardInfo }) {
    const navigate = useNavigate();

    const handleShowDetails = (option) => {
        navigate(`/dashboard/${option}`);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    width: 250,
                    minWidth: 100,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    px: 2.5,
                    py: 1.5,
                    // border: "1px solid red",
                }}
            >
                <Box sx={{ color: "text.secondary", fontSize: 14 }}>{cardInfo.title}</Box>
                <Box sx={{ color: "text.primary", fontSize: 28, fontWeight: "medium" }}>
                    {cardInfo.metric}
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
                <Link
                    href="/dashboard/overview"
                    color="#005792"
                    sx={{ display: "block", fontSize: 14, mt: 0.5 }}
                >
                    Xem chi tiết
                </Link>
            </Box>
        </ThemeProvider>
    );
}

export default SummaryCard;

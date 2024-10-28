import { useState, useEffect } from "react";
import { getOverviewDataAPT } from "~/apis";
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import SummaryCard from "~/pages/Dashboard/Admin/AdminOverview/SummaryCard/SummaryCard";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

function AdminOverview() {
    const [overviewData, setOverviewData] = useState(null);
    const [cardInfos, setCardInfos] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchOverviewData = async () => {
            let response = await getOverviewDataAPT();
            setOverviewData(response.data);
        };

        fetchOverviewData();
    }, []);

    useEffect(() => {
        if (overviewData) {
            let revenue = overviewData.bookings.reduce(
                (totalRevenue, booking) => totalRevenue + booking.total,
                0
            );
            setCardInfos([
                {
                    name: "users",
                    title: "Tổng khách hàng",
                    metric: overviewData.userCount,
                    growth: 10.8,
                },
                {
                    name: "movies",
                    title: "Phim đang chiếu",
                    metric: overviewData.movieCount,
                    growth: 20,
                },
                {
                    name: "bookings",
                    title: "Số vé bán ra",
                    metric: overviewData.ticketCount,
                    growth: -2,
                },
                {
                    name: "statistics",
                    title: "Doanh thu",
                    metric: revenue,
                    growth: 12,
                },
            ]);

            let bookingData = {};
            let results = [];
            overviewData.bookings.map((booking) => {
                if (!bookingData[booking.startTime]) {
                    bookingData[booking.startTime] = 0;
                }
                bookingData[booking.startTime] += booking.total;
            });

            for (let i = 1; i <= dayjs().daysInMonth(); i++) {
                let currentDate = dayjs().startOf("month").add(i, "day").valueOf();

                results.push({
                    name: dayjs(currentDate).format("DD-MM"),
                    uv: bookingData[currentDate] || 0,
                });
            }

            setChartData(results);
        }
    }, [overviewData]);

    console.log("Check overview data: ", overviewData);
    return (
        <>
            <Box sx={{ display: "flex", gap: 5 }}>
                {cardInfos &&
                    cardInfos.length > 0 &&
                    cardInfos.map((cardInfo, index) => {
                        return <SummaryCard key={index} cardInfo={cardInfo} />;
                    })}
            </Box>

            {chartData && chartData.length > 0 && (
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        p: "20px 30px",
                        mt: 2,
                        borderRadius: "20px",
                    }}
                >
                    <Box sx={{ width: "100%", mt: 2.5 }}>
                        <Typography></Typography>
                        <ResponsiveContainer width="95%" height={400}>
                            <AreaChart
                                data={chartData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="url(#colorUv)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default AdminOverview;

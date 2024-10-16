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

function AdminOverview() {
    let cardInfos = [
        {
            title: "Tổng khách hàng",
            metric: 369,
            growth: 10.8,
        },
        {
            title: "Phim đang chiếu",
            metric: 12,
            growth: 20,
        },
        {
            title: "Số vé bán ra",
            metric: 2668,
            growth: -10,
        },
        {
            title: "Doanh thu",
            metric: 2668,
            growth: -10,
        },
    ];

    const data = [
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 200, pv: 2400, amt: 2400 },
        { name: "Page C", uv: 800, pv: 2400, amt: 2400 },
        { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page E", uv: 200, pv: 2400, amt: 2400 },
        { name: "Page F", uv: 800, pv: 2400, amt: 2400 },
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 200, pv: 2400, amt: 2400 },
        { name: "Page C", uv: 800, pv: 2400, amt: 2400 },
        { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page E", uv: 200, pv: 2400, amt: 2400 },
        { name: "Page F", uv: 800, pv: 2400, amt: 2400 },
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 200, pv: 2400, amt: 2400 },
        { name: "Page C", uv: 800, pv: 2400, amt: 2400 },
        { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page E", uv: 200, pv: 2400, amt: 2400 },
        { name: "Page F", uv: 800, pv: 2400, amt: 2400 },
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 200, pv: 2400, amt: 2400 },
        { name: "Page C", uv: 800, pv: 2400, amt: 2400 },
        { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page E", uv: 200, pv: 2400, amt: 2400 },
        { name: "Page F", uv: 800, pv: 2400, amt: 2400 },
        { name: "Page F", uv: 900, pv: 2400, amt: 2400 },
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 200, pv: 2400, amt: 2400 },
        { name: "Page C", uv: 800, pv: 2400, amt: 2400 },
        { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page E", uv: 200, pv: 2400, amt: 2400 },
        { name: "Page F", uv: 800, pv: 2400, amt: 2400 },
    ];

    return (
        <>
            <Box sx={{ display: "flex", gap: 5 }}>
                {cardInfos &&
                    cardInfos.map((cardInfo, index) => {
                        return <SummaryCard key={index} cardInfo={cardInfo} />;
                    })}
            </Box>

            <Box sx={{ bgcolor: "background.paper", p: "20px 30px", mt: 2, borderRadius: "20px" }}>
                <Box sx={{ width: "100%", mt: 2.5 }}>
                    <Typography></Typography>
                    <ResponsiveContainer width="95%" height={400}>
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
        </>
    );
}

export default AdminOverview;

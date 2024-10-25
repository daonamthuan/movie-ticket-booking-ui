import { useState, useEffect } from "react";
import { getAllBookingByUserIdAPI } from "~/apis";
import { formatVND } from "~/utils/helper";
import { DataGrid } from "@mui/x-data-grid";
import TicketInfoModal from "~/components/TicketInfoModal/TicketInfoModal";
import Navbar from "~/components/Navbar/Navbar";
import Footer from "~/components/Footer/Footer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

function BookingHistory() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [bookings, setBookings] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isOpenTicketModal, setIsOpenTicketModal] = useState(false);
    const now = new Date().getTime();

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        {
            field: "cinemaName",
            headerName: "Cụm rạp",
            width: 150,
            renderCell: (params) => params.row.schedule.room.cinema.cinemaName,
        },
        {
            field: "roomName",
            headerName: "Phòng chiếu",
            width: 120,
            renderCell: (params) => params.row.schedule.room.roomName,
        },
        {
            field: "movieId",
            headerName: "Tên phim",
            width: 300,
            renderCell: (params) => params.row.schedule.movie.movieName,
        },
        {
            field: "date",
            headerName: "Ngày chiếu",
            width: 95,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                let date = dayjs(params.row.schedule.startTime).format("DD/MM/YYYY");
                return date;
            },
        },

        {
            field: "startTime",
            headerName: "Giờ bắt đầu",
            width: 95,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                let startTime = dayjs(params.row.schedule.startTime);
                return startTime.format("HH:mm:ss");
            },
        },
        {
            field: "endTime",
            headerName: "Giờ kết thúc",
            width: 95,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                let endTime = dayjs(params.row.schedule.endTime);
                return endTime.format("HH:mm:ss");
            },
        },
        {
            field: "total",
            headerName: "Tổng tiền",
            width: 90,
            renderCell: (params) => formatVND(params.row.total),
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 100,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return now > params.row.schedule.endTime ? (
                    <Box
                        sx={{
                            textAlign: "center",
                            bgcolor: "#04AA6D",
                            color: "common.white",
                        }}
                    >
                        Đã chiếu
                    </Box>
                ) : now > params.row.schedule.startTime && now < params.row.schedule.endTime ? (
                    <Box>
                        <Box
                            sx={{
                                textAlign: "center",
                                bgcolor: "#e9594d",
                                color: "common.white",
                            }}
                        >
                            Đang chiếu
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <Box
                            sx={{
                                textAlign: "center",
                                bgcolor: "#ffc107",
                                color: "common.white",
                            }}
                        >
                            Sắp chiếu
                        </Box>
                    </Box>
                );
            },
        },
        {
            field: "action",
            headerName: "Thao tác",
            width: 110,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenTicketModal(params.row)}
                    sx={{ py: "4px" }}
                >
                    Xem vé
                </Button>
            ),
        },
    ];

    useEffect(() => {
        const fetchBookingsByUserId = async () => {
            const response = await getAllBookingByUserIdAPI(userInfo.id);
            let bookings = response.data;
            bookings.sort((a, b) => b.schedule.startTime - a.schedule.startTime);
            setBookings(bookings);
        };
        fetchBookingsByUserId();
    }, []);

    // Hàm mở/đóng modal
    const handleOpenTicketModal = (ticket) => {
        setIsOpenTicketModal(true);
        setSelectedTicket(ticket);
    };
    const handleCloseTicketModal = () => setIsOpenTicketModal(false);

    return (
        <>
            <Box sx={{ bgcolor: "#f8f8f8" }}>
                <Navbar />

                <Box sx={{ maxWidth: "1280px", width: "100%", mx: "auto", my: 5, px: 4 }}>
                    <Typography
                        sx={{
                            fontSize: "28px",
                            fontWeight: 600,
                            fontFamily: "Be Vietnam Pro",
                            textAlign: "center",
                            mt: 2,
                            color: "#337ab7",
                        }}
                    >
                        LỊCH SỬ MUA VÉ
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontFamily: "Be Vietnam Pro",
                            textAlign: "center",
                            mb: 3,
                        }}
                    >
                        {`Khách hàng: ${userInfo.lastName} ${userInfo.firstName}`}
                    </Typography>
                    <DataGrid
                        rows={bookings}
                        columns={columns}
                        rowHeight={45}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: Math.max(10, bookings.length),
                                },
                            },
                        }}
                        disableRowSelectionOnClick
                        sx={{
                            "& .MuiDataGrid-root": {
                                backgroundColor: "#ffffff",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#f0f0f0",
                                fontWeight: "bold",
                                color: "#1976d2",
                            },
                            "& .MuiDataGrid-cell": {
                                backgroundColor: "#ffffff",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                backgroundColor: "#ffffff",
                            },
                        }}
                    />
                </Box>

                <Footer />
            </Box>
            <TicketInfoModal
                isOpenTicketModal={isOpenTicketModal}
                handleCloseTicketModal={handleCloseTicketModal}
                ticket={selectedTicket}
            />
        </>
    );
}

export default BookingHistory;

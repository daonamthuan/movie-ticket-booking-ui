import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { deleteScheduleAPI } from "~/apis";
import { setDataScheduleEdit } from "~/redux/slice/scheduleSlice";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

function TableSchedule({ schedules, setIsOpenScheduleModal, handleFetchSchedules }) {
    const dispatch = useDispatch();
    const { rooms, movies } = useSelector((state) => state.schedule);

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        {
            field: "cinemaName",
            headerName: "Cụm rạp",
            width: 140,
            renderCell: (params) => {
                const room = rooms.find((room) => room.id === params.row.roomId);
                return room.cinemaRooms.cinemaName;
            },
        },
        {
            field: "roomId",
            headerName: "Phòng chiếu",
            width: 115,
            renderCell: (params) => {
                const room = rooms.find((room) => room.id === params.value);
                return room.roomName;
            },
        },
        {
            field: "movieId",
            headerName: "Tên phim",
            width: 350,
            renderCell: (params) => {
                const movie = movies.find((movie) => movie.id === params.value);
                return movie.movieName;
            },
        },
        {
            field: "date",
            headerName: "Ngày chiếu",
            width: 95,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                let date = dayjs(params.row.startTime).format("DD/MM/YYYY");
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
                let startTime = dayjs(params.row.startTime);
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
                let endTime = dayjs(params.row.endTime);
                return endTime.format("HH:mm:ss");
            },
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 110,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                let now = new Date().getTime();
                return now > params.row.endTime ? (
                    <Box
                        sx={{
                            textAlign: "center",
                            bgcolor: "#04AA6D",
                            color: "common.white",
                        }}
                    >
                        Đã chiếu
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
            width: 95,
            renderCell: (params) => {
                let now = new Date().getTime();
                if (now < params.row.endTime) {
                    return (
                        <div>
                            <IconButton
                                onClick={() => handleEditSchedule(params.row)}
                                aria-label="edit"
                                sx={{ color: "primary.main" }}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => handleDeleteSchedule(params.row)}
                                aria-label="delete"
                                sx={{ color: "red" }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    );
                }
            },
        },
    ];

    const handleEditSchedule = (scheduleData) => {
        console.log("Check scheduleData: ", scheduleData);
        dispatch(setDataScheduleEdit(scheduleData));
        setIsOpenScheduleModal(true);
    };

    const handleDeleteSchedule = async (scheduleData) => {
        let response = await deleteScheduleAPI(scheduleData.id);

        if (response && response.status === 200) {
            toast.success("Xóa lịch chiếu thành công!");
            handleFetchSchedules();
        }
    };

    return (
        <Box sx={{ width: "100%", margin: "0 auto" }}>
            <DataGrid
                rows={schedules}
                columns={columns}
                rowHeight={45}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: Math.max(6, schedules.length), // so dong moi trang
                        },
                    },
                }}
                disableRowSelectionOnClick
                sx={{
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#f0f0f0",
                        fontWeight: "bold",
                        color: "#1976d2",
                    },
                }}
                sortModel={[
                    {
                        field: "startTime",
                        sort: "desc",
                    },
                ]}
            />
        </Box>
    );
}

export default TableSchedule;

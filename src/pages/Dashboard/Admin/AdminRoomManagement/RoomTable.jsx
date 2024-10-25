import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { setDataRoomEdit } from "~/redux/slice/roomSlice";
import { deleteRoomAPI } from "~/apis";
import { toast } from "react-toastify";
import dayjs from "dayjs";

function RoomTable({ rooms, setIsOpenRoomModal, handleFetchCinemaInfo }) {
    const dispatch = useDispatch();

    const columns = [
        { field: "id", headerName: "ID", width: 100, align: "center", headerAlign: "center" },

        {
            field: "roomName",
            headerName: "Tên phòng",
            width: 180,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "occupancy ",
            headerName: "Số lượng",
            width: 120,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return `${params.row.totalSeats}`;
            },
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 180,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return params.row.schedules.length === 0 ? (
                    <Box
                        sx={{
                            textAlign: "center",
                            bgcolor: "#04AA6D",
                            color: "common.white",
                        }}
                    >
                        Sẵn sàng
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
                            Đang chiếu
                        </Box>
                    </Box>
                );
            },
        },
        {
            field: "startTime",
            headerName: "Giờ bắt đầu",
            width: 120,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                let startTime = params.row.schedules[0]?.startTime;
                if (startTime) {
                    startTime = dayjs(startTime);
                    let formattedTime = startTime.format("HH:mm:ss");
                    return `${formattedTime}`;
                }
                return "";
            },
        },
        {
            field: "endTime",
            headerName: "Giờ kết thúc",
            width: 120,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                let endTime = params.row.schedules[0]?.endTime;
                if (endTime) {
                    endTime = dayjs(endTime);
                    let formattedTime = endTime.format("HH:mm:ss");
                    return `${formattedTime}`;
                }
                return "";
            },
        },
        {
            field: "note",
            headerName: "Ghi chú",
            width: 200,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "action",
            headerName: "Thao tác",
            width: 120,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <div>
                    <IconButton
                        onClick={() => handleEditRoom(params.row)}
                        aria-label="edit"
                        sx={{ color: "primary.main" }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteRoom(params.row.id)}
                        aria-label="delete"
                        sx={{ color: "red" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    const handleEditRoom = (roomInfo) => {
        dispatch(setDataRoomEdit(roomInfo));
        setIsOpenRoomModal(true);
    };

    const handleDeleteRoom = async (roomId) => {
        let response = await deleteRoomAPI(roomId);
        if (response && response.status === 200) {
            toast.success("Xóa phòng chiếu phim thành công!");
            handleFetchCinemaInfo();
        }
    };

    return (
        <Box sx={{ width: "100%", margin: "0 auto" }}>
            <DataGrid
                rows={rooms}
                columns={columns}
                rowHeight={45}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: Math.max(10, rooms.length), // so dong moi trang
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
                        field: "id",
                        sort: "asc",
                    },
                ]}
            />
        </Box>
    );
}

export default RoomTable;

import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { fetchUsersDataAPI, deleteUserAPI } from "~/apis";
import { toast } from "react-toastify";
import { getFileNameFromPath } from "~/utils/helper";
import emitter from "~/utils/emitter";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

function TableUser({ setIsOpenUserModal, setIsCreateNewUser, setDataUserEdit }) {
    const [users, setUsers] = useState();
    const { genders, roles, memberships } = useSelector((state) => state.user);

    useEffect(() => {
        fetchUsersData();

        // emitter to refreshTable
        emitter.on("refreshTableUserData", fetchUsersData);
        return () => {
            // clear emitter when component unmount
            emitter.off("refreshTableUserData", fetchUsersData);
        };
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        {
            field: "email",
            headerName: "Email",
            width: 220,
        },
        {
            field: "lastName",
            headerName: "Họ đệm",
            width: 135,
        },
        {
            field: "firstName",
            headerName: "Tên",
            width: 100,
        },
        {
            field: "phoneNumber",
            headerName: "Số điện thoại",
            width: 120,
        },
        {
            field: "gender",
            headerName: "Giới tính",
            width: 90,
            renderCell: (params) => {
                const gender = genders.find((gender) => gender.keyCode === params.value);
                return gender.value;
            },
        },
        {
            field: "role",
            headerName: "Vai trò",
            width: 110,
            renderCell: (params) => {
                const role = roles.find((role) => role.keyCode === params.value);
                return role.value;
            },
        },
        {
            field: "membership",
            headerName: "Hạng",
            width: 110,
            renderCell: (params) => {
                const membership = memberships.find(
                    (membership) => membership.keyCode === params.value
                );
                return membership.value;
            },
        },
        {
            field: "birthday",
            headerName: "Ngày sinh",
            width: 110,
            valueFormatter: (params) => {
                return dayjs(params).format("DD/MM/YYYY");
            },
        },
        {
            field: "action",
            headerName: "Thao tác",
            width: 100,
            renderCell: (params) => (
                <div>
                    <IconButton
                        onClick={() => handleEditUser(params.row)}
                        aria-label="edit"
                        sx={{ color: "primary.main" }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteUser(params.row)}
                        aria-label="delete"
                        sx={{ color: "red" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    const fetchUsersData = async () => {
        const response = await fetchUsersDataAPI();
        setUsers(response.data);
    };

    const handleEditUser = (userData) => {
        setDataUserEdit(userData);
        setIsCreateNewUser(false);
        setIsOpenUserModal(true);
    };

    const handleDeleteUser = async (userData) => {
        let response = null;
        if (userData.image) {
            let publicId = getFileNameFromPath(userData.image);
            response = await deleteUserAPI(userData.id, publicId);
        } else {
            response = await deleteUserAPI(userData.id);
        }

        if (response && response.status === 200) {
            toast.success("Xóa người dùng thành công!");
            fetchUsersData();
        }
    };

    return (
        <Box sx={{ width: "100%", margin: "0 auto" }}>
            <DataGrid
                rows={users}
                columns={columns}
                rowHeight={38}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10, // so dong moi trang
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
            />
        </Box>
    );
}

export default TableUser;

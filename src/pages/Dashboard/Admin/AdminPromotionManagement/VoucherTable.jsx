import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { deleteVoucherAPI } from "~/apis";
import { setDataVoucherEdit } from "~/redux/slice/voucherSlice";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

function VoucherTable({ vouchers, setIsOpenVoucherModal, handleFetchVouchers }) {
    const dispatch = useDispatch();

    const columns = [
        { field: "id", headerName: "ID", width: 60 },
        {
            field: "voucherCode",
            headerName: "Mã giảm giá",
            width: 200,
        },
        {
            field: "status",
            headerName: "Tình trạng",
            width: 150,
        },

        {
            field: "validFrom",
            headerName: "Ngày hiệu lực",
            width: 200,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                console.log("Check params: ", params);
                let date = dayjs(params.row.validFrom).format("DD/MM/YYYY");
                return date;
            },
        },

        {
            field: "validUntil",
            headerName: "Ngày hết hạn",
            width: 200,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                let date = dayjs(params.row.validUntil).format("DD/MM/YYYY");
                return date;
            },
        },
        {
            field: "action",
            headerName: "Thao tác",
            width: 160,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <div>
                        <IconButton
                            onClick={() => handleEditVoucher(params.row)}
                            aria-label="edit"
                            sx={{ color: "primary.main" }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => handleDeleteVoucher(params.row)}
                            aria-label="delete"
                            sx={{ color: "red" }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                );
            },
        },
    ];

    const handleEditVoucher = (voucherData) => {
        dispatch(setDataVoucherEdit(voucherData));
        setIsOpenVoucherModal(true);
    };

    const handleDeleteVoucher = async (voucherData) => {
        let response = await deleteVoucherAPI(voucherData.id);

        if (response && response.status === 200) {
            toast.success("Xóa voucher thành công!");
            handleFetchVouchers();
        }
    };

    return (
        <Box sx={{ width: "100%", margin: "0 auto" }}>
            <DataGrid
                rows={vouchers}
                columns={columns}
                rowHeight={45}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: Math.max(6, vouchers.length), // so dong moi trang
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

export default VoucherTable;

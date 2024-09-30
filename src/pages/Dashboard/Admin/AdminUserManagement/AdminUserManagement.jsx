import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import TableUser from "./TableUser";
import ModalUser from "./ModalUser";
import { useDispatch } from "react-redux";
import { fetchGenders, fetchRoles, fetchMemberships } from "~/redux/slice/userSlice";

function AdminUserManagement() {
    const [isOpenUserModal, setIsOpenUserModal] = useState(false);
    const [isCreateNewUser, setIsCreateNewUser] = useState(true);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGenders());
        dispatch(fetchRoles());
        dispatch(fetchMemberships());
    }, []);

    const handleOpenUserModal = () => {
        setIsCreateNewUser(true);
        setIsOpenUserModal(true);
    };

    return (
        <>
            <Box sx={{ bgcolor: "background.paper", p: "15px 30px", borderRadius: "20px" }}>
                <Typography
                    sx={{
                        mb: 1.5,
                        fontSize: "18px",
                        fontWeight: 600,
                        textAlign: "center",
                        color: "#005792",
                    }}
                >
                    QUẢN LÝ NGƯỜI DÙNG
                </Typography>

                {/*Table user */}
                <TableUser
                    setIsOpenUserModal={setIsOpenUserModal}
                    setIsCreateNewUser={setIsCreateNewUser}
                    setDataUserEdit={setDataUserEdit}
                />

                <Button
                    onClick={handleOpenUserModal}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{
                        width: "170px",
                        px: 0.5,
                        mt: 1.5,
                        fontSize: "14px",
                        textTransform: "none",
                    }}
                >
                    Thêm người dùng
                </Button>
            </Box>

            <ModalUser
                isOpenUserModal={isOpenUserModal}
                setIsOpenUserModal={setIsOpenUserModal}
                isCreateNewUser={isCreateNewUser}
                dataUserEdit={dataUserEdit}
                setDataUserEdit={setDataUserEdit}
            />
        </>
    );
}

export default AdminUserManagement;

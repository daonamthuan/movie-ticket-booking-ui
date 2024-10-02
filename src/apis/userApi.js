import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const handleLogoutAPI = async () => {
    localStorage.removeItem("userInfo");

    // Call api to remove HttpOnlyCookie
    return await authorizedAxiosInstance.delete(`/users/logout`);
};

export const refreshTokenAPI = async () => {
    return await authorizedAxiosInstance.put(`/users/refresh-token`);
};

export const fetchGenderAPI = async () => {
    return await authorizedAxiosInstance.get("/users/get-all-genders");
};

export const fetchRoleAPI = async () => {
    return await authorizedAxiosInstance.get("/users/get-all-roles");
};

export const fetchMembershipAPI = async () => {
    return await authorizedAxiosInstance.get("/users/get-all-memberships");
};

export const fetchAgeLimitAPI = async () => {
    return await authorizedAxiosInstance.get("/users/get-age-limits");
};

export const fetchUsersDataAPI = async () => {
    return await authorizedAxiosInstance.get("/users/get-all-users");
};

export const createNewUserAPI = async (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
        if (value !== null) {
            formData.append(key, value);
        }
    }

    return await authorizedAxiosInstance.post("/users/create-new-user", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateUserAPI = async (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
        if (value !== null) {
            formData.append(key, value);
        }
    }
    return await authorizedAxiosInstance.put("/users/update-user", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteUserAPI = async (userId, publicId) => {
    return await authorizedAxiosInstance.delete(
        `/users/delete-user?userId=${userId}&publicId=${publicId}`
    );
};

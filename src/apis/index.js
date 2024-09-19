import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const handleLogoutAPI = async () => {
    localStorage.removeItem("userInfo");

    // Call api to remove HttpOnlyCookie
    return await authorizedAxiosInstance.delete(`/users/logout`);
};

export const refreshTokenAPI = async () => {
    return await authorizedAxiosInstance.put(`/users/refresh-token`);
};

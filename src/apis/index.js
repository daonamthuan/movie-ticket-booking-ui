import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const handleLogoutAPI = async () => {
    localStorage.removeItem("userInfo");

    // Call api to remove HttpOnlyCookie
    return await authorizedAxiosInstance.delete(`/users/logout`);
};

export const refreshTokenAPI = async () => {
    return await authorizedAxiosInstance.put(`/users/refresh-token`);
};

export const fetchUsersDataAPI = async () => {
    return await authorizedAxiosInstance.get("/users/get-all-users");
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

export const createNewUserAPI = async (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
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
        if (key === "image" && value instanceof File) {
            formData.append(key, value);
        } else {
            formData.append(key, value);
        }
    }
    return await authorizedAxiosInstance.put("/users/update-user", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    // return await authorizedAxiosInstance.post("/users/update-user", data);
};

export const deleteUserAPI = async (userId, publicId) => {
    return await authorizedAxiosInstance.delete(
        `/users/delete-user?userId=${userId}&publicId=${publicId}`
    );
};

export const getRevenueLast30DaysAPI = async () => {
    return await authorizedAxiosInstance.get("/dashboards/get-revenue");
};

export const getAllMoviesByStatusAPI = async (movieStatus) => {
    return await authorizedAxiosInstance.get(`/dashboards/get-all-movies?status=${movieStatus}`);
};

export const createNewMovieAPI = async (movieData) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(movieData)) {
        formData.append(key, value);
    }
    return await authorizedAxiosInstance.post("/dashboards/create-new-movie", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateMovieAPI = async (movieData) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(movieData)) {
        formData.append(key, value);
    }
    return await authorizedAxiosInstance.put("/dashboards/update-movie", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteMovieAPI = async (movieId, publicId) => {
    return await authorizedAxiosInstance.delete(
        `/dashboards/delete-movie?movieId=${movieId}&publicId=${publicId}`
    );
};

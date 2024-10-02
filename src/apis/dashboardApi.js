import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const getRevenueLast30DaysAPI = async () => {
    return await authorizedAxiosInstance.get("/dashboards/get-revenue");
};

// Movie
export const getAllMoviesByStatusAPI = async (movieStatus) => {
    return await authorizedAxiosInstance.get(`/dashboards/get-all-movies?status=${movieStatus}`);
};

export const createNewMovieAPI = async (movieData) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(movieData)) {
        if (value !== null) {
            formData.append(key, value);
        }
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
        if (value !== null) {
            formData.append(key, value);
        }
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

// Food
export const fetchFoodsAPI = async () => {
    return await authorizedAxiosInstance.get("/dashboards/get-all-foods");
};

export const createNewFoodAPI = async (foodData) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(foodData)) {
        if (value !== null) {
            formData.append(key, value);
        }
    }
    return await authorizedAxiosInstance.post("/dashboards/create-new-food", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateFoodAPI = async (foodData) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(foodData)) {
        if (value !== null) {
            formData.append(key, value);
        }
    }
    return await authorizedAxiosInstance.put("/dashboards/update-food", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteFoodAPI = async (foodId, publicId) => {
    return await authorizedAxiosInstance.delete(
        `/dashboards/delete-food?foodId=${foodId}&publicId=${publicId}`
    );
};

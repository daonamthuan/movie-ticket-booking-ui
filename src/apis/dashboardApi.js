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

// Cinema
export const fetchCinemasAPI = async () => {
    return await authorizedAxiosInstance.get("/dashboards/get-all-cinemas");
};

export const createNewCinemaAPI = async (cinemaData) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(cinemaData)) {
        if (value !== null) {
            formData.append(key, value);
        }
    }
    return await authorizedAxiosInstance.post("/dashboards/create-new-cinema", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateCinemaAPI = async (cinemaData) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(cinemaData)) {
        if (value !== null) {
            formData.append(key, value);
        }
    }
    return await authorizedAxiosInstance.put("/dashboards/update-cinema", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteCinemaAPI = async (cinemaId, publicId) => {
    return await authorizedAxiosInstance.delete(
        `/dashboards/delete-cinema?cinemaId=${cinemaId}&publicId=${publicId}`
    );
};

// Rooms
export const getCinemaInfoByIdAPI = async (cinemaId) => {
    return await authorizedAxiosInstance.get(`/dashboards/get-cinema-info-by-id/${cinemaId}`);
};

export const getAllRoomsByCinemaIdAPI = async (cinemaId) => {
    return await authorizedAxiosInstance.get(
        `/dashboards/get-all-rooms-by-cinema-id?cinemaId=${cinemaId}`
    );
};

export const createNewRoomAPI = async (roomData) => {
    return await authorizedAxiosInstance.post("/dashboards/create-new-room", roomData);
};

export const updateRoomAPI = async (roomData) => {
    return await authorizedAxiosInstance.put("/dashboards/update-room", roomData);
};

export const deleteRoomAPI = async (roomId) => {
    return await authorizedAxiosInstance.delete(`dashboards/delete-room/${roomId}`);
};

// schedules
export const fetchSchedulesDataAPI = async () => {
    return await authorizedAxiosInstance.get("/dashboards/get-all-schedules");
};

export const createNewScheduleAPI = async (scheduleData) => {
    return await authorizedAxiosInstance.post("/dashboards/create-new-schedule", scheduleData);
};

export const updateScheduleAPI = async (scheduleData) => {
    return await authorizedAxiosInstance.put("/dashboards/update-schedule", scheduleData);
};

export const deleteScheduleAPI = async (scheduleId) => {
    return await authorizedAxiosInstance.delete(`/dashboards/delete-schedule/${scheduleId}`);
};

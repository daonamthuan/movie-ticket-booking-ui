import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const getRevenueLast30DaysAPI = async () => {
    return await authorizedAxiosInstance.get("/dashboards/get-revenue");
};

// Movie
export const getAllMoviesByStatusAPI = async (movieStatus) => {
    return await authorizedAxiosInstance.get(`/dashboards/get-all-movies?status=${movieStatus}`);
};

export const getMovieByIdAPI = async (movieId) => {
    return await authorizedAxiosInstance.get(`/dashboards/get-movie-by-id/${movieId}`);
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
export const fetchAllCinemasAPI = async () => {
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

export const getRoomByIdAPI = async (roomId) => {
    return await authorizedAxiosInstance.get(`/dashboards/get-room-by-id/${roomId}`);
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

export const getScheduleByIdAPI = async (scheduleId) => {
    return await authorizedAxiosInstance.get(`/dashboards/get-schedule-by-id/${scheduleId}`);
};

export const getNextThreeDaysScheduleAPI = async (movieId) => {
    return await authorizedAxiosInstance.get(
        `/dashboards/get-next-three-days-schedule?movieId=${movieId}`
    );
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

// Voucher
export const getVoucherAPI = async (voucherCode) => {
    return await authorizedAxiosInstance.get(`/dashboards/get-voucher?voucherCode=${voucherCode}`);
};

// Payment
export const createPaymentLinkAPI = async () => {
    return await authorizedAxiosInstance.post(`/dashboards/create-payment-link`);
};

export const updatePaymentSuccessAPI = async (bookingId) => {
    return await authorizedAxiosInstance.put(
        `/dashboards/update-payment-success?bookingId=${bookingId}`
    );
};

export const updatePaymentCancelledAPI = async (bookingId) => {
    return await authorizedAxiosInstance.put(
        `/dashboards/update-payment-cancelled?bookingId=${bookingId}`
    );
};

// Booking
export const updateBookingAPI = async (bookingData) => {
    return await authorizedAxiosInstance.put(`/dashboards/update-booking`, bookingData);
};

export const getAllBookingByUserIdAPI = async (userId) => {
    return await authorizedAxiosInstance.get(
        `/dashboards/get-all-booking-by-user-id?userId=${userId}`
    );
};

// Seat_Booking
export const getAllBookedSeatsAPI = async (scheduleId) => {
    return await authorizedAxiosInstance.get(
        `/dashboards/get-all-booked-seats?scheduleId=${scheduleId}`
    );
};

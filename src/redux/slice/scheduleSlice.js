import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCinemasAPI, getAllRoomsByCinemaIdAPI, getAllMoviesByStatusAPI } from "~/apis";

const initialState = {
    isLoading: false,
    dataScheduleEdit: {},
    cinemas: [],
    rooms: [],
    movies: [],
    error: null,
};

export const fetchCinemas = createAsyncThunk("fetchCinemas", async () => {
    const response = await fetchCinemasAPI();
    return response.data;
});

export const fetchScheduleRooms = createAsyncThunk("fetchScheduleRooms", async (cinemaId) => {
    const response = await getAllRoomsByCinemaIdAPI(cinemaId);
    return response.data;
});

export const fetchScheduleMovies = createAsyncThunk("fetchScheduleMovies", async (status) => {
    const response = await getAllMoviesByStatusAPI(status);
    return response.data;
});

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        setDataScheduleEdit: (state, action) => {
            state.dataScheduleEdit = action.payload;
        },
        clearDataScheduleEdit: (state) => {
            state.dataScheduleEdit = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCinemas.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCinemas.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cinemas = action.payload;
            })
            .addCase(fetchCinemas.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchScheduleRooms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchScheduleRooms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.rooms = action.payload;
            })
            .addCase(fetchScheduleRooms.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchScheduleMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchScheduleMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload;
            })
            .addCase(fetchScheduleMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { setDataScheduleEdit, clearDataScheduleEdit } = scheduleSlice.actions;

export default scheduleSlice.reducer;

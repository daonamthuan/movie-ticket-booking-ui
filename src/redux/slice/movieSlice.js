import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAgeLimitAPI } from "~/apis";

const initialState = {
    isLoading: false,
    dataMovieEdit: {},
    ageLimitArray: [],
    error: null,
};

export const fetchAgeLimits = createAsyncThunk("fetchAgeLimits", async () => {
    const response = await fetchAgeLimitAPI();
    return response.data;
});

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setMovieEditData: (state, action) => {
            state.dataMovieEdit = action.payload;
        },
        clearMovieEditData: (state) => {
            state.dataMovieEdit = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAgeLimits.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAgeLimits.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ageLimitArray = action.payload;
            })
            .addCase(fetchAgeLimits.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { setMovieEditData, clearMovieEditData } = movieSlice.actions;

export default movieSlice.reducer;

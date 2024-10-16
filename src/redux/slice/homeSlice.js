import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMoviesByStatusAPI } from "~/apis";

const initialState = {
    isLoading: false,
    allMovies: [],
    movieTrailerUrl: "",
    error: null,
};

export const fetchAllMoviesHome = createAsyncThunk("fetchAllMoviesHome", async () => {
    const response = await getAllMoviesByStatusAPI("all");
    return response.data;
});

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setMovieTrailerUrl: (state, action) => {
            state.movieTrailerUrl = action.payload;
        },
        clearMovieTrailerUrl: (state) => {
            state.movieTrailerUrl = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMoviesHome.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllMoviesHome.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allMovies = action.payload;
            })
            .addCase(fetchAllMoviesHome.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { setMovieTrailerUrl, clearMovieTrailerUrl } = homeSlice.actions;

export default homeSlice.reducer;

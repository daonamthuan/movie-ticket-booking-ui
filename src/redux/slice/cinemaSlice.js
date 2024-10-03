import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    dataCinemaEdit: {},
    error: null,
};

const cinemaSlice = createSlice({
    name: "cinema",
    initialState,
    reducers: {
        setDataCinemaEdit: (state, action) => {
            state.dataCinemaEdit = action.payload;
        },
        clearDataCinemaEdit: (state) => {
            state.dataCinemaEdit = {};
        },
    },
});

export const { setDataCinemaEdit, clearDataCinemaEdit } = cinemaSlice.actions;

export default cinemaSlice.reducer;

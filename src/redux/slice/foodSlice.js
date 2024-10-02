import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    dataFoodEdit: {},
    error: null,
};

const foodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {
        setFoodEditData: (state, action) => {
            state.dataFoodEdit = action.payload;
        },
        clearFoodEditData: (state) => {
            state.dataFoodEdit = {};
        },
    },
});

export const { setFoodEditData, clearFoodEditData } = foodSlice.actions;

export default foodSlice.reducer;

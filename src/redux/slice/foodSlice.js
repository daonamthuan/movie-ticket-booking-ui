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
        setDataFoodEdit: (state, action) => {
            state.dataFoodEdit = action.payload;
        },
        clearDataFoodEdit: (state) => {
            state.dataFoodEdit = {};
        },
    },
});

export const { setDataFoodEdit, clearDataFoodEdit } = foodSlice.actions;

export default foodSlice.reducer;

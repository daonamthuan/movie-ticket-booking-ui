import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    dataRoomEdit: {},
    error: null,
};

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setDataRoomEdit: (state, action) => {
            state.dataRoomEdit = action.payload;
        },
        clearDataRoomEdit: (state) => {
            state.dataRoomEdit = {};
        },
    },
});

export const { setDataRoomEdit, clearDataRoomEdit } = roomSlice.actions;

export default roomSlice.reducer;

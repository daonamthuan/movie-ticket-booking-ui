import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    dataVoucherEdit: {},
    error: null,
};

const voucherSlice = createSlice({
    name: "voucher",
    initialState,
    reducers: {
        setDataVoucherEdit: (state, action) => {
            console.log("Check action: ", action);
            state.dataVoucherEdit = action.payload;
        },
        clearDataVoucherEdit: (state) => {
            state.dataVoucherEdit = {};
        },
    },
});

export const { setDataVoucherEdit, clearDataVoucherEdit } = voucherSlice.actions;

export default voucherSlice.reducer;

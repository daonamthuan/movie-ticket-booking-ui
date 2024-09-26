import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGenderAPI, fetchRoleAPI, fetchMembershipAPI } from "~/apis";

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    memberships: [],
    error: null,
};

export const fetchGenders = createAsyncThunk("fetchGenders", async () => {
    const response = await fetchGenderAPI();
    return response.data;
});

export const fetchRoles = createAsyncThunk("fetchRoles", async () => {
    const response = await fetchRoleAPI();
    return response.data;
});

export const fetchMemberships = createAsyncThunk("fetchMemberships", async () => {
    const response = await fetchMembershipAPI();
    return response.data;
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGenders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.genders = action.payload;
            })
            .addCase(fetchGenders.rejected, (state, action) => {
                state.isLoading = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchRoles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roles = action.payload;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMemberships.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMemberships.fulfilled, (state, action) => {
                state.isLoading = false;
                state.memberships = action.payload;
            })
            .addCase(fetchMemberships.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;

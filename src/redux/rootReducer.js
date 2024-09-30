import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import movieReducer from "./slice/movieSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    movie: movieReducer,
});

export default rootReducer;

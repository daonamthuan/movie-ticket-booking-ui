import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import movieReducer from "./slice/movieSlice";
import foodReducer from "./slice/foodSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    movie: movieReducer,
    food: foodReducer,
});

export default rootReducer;

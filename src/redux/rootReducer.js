import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import movieReducer from "./slice/movieSlice";
import foodReducer from "./slice/foodSlice";
import cinemaReducer from "./slice/cinemaSlice";
import roomReducer from "./slice/roomSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    movie: movieReducer,
    food: foodReducer,
    cinema: cinemaReducer,
    room: roomReducer,
});

export default rootReducer;

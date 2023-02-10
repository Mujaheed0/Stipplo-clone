import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";
import jobReducer from "./jobSlice";
import listReducer from "./listSlice";

export default configureStore({
  reducer: {
    board: boardReducer,
    list:listReducer,
    job:jobReducer
  },
});


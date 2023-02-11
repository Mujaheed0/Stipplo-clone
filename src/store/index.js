import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slice/boardSlice";
import jobReducer from "./slice/jobSlice";
import listReducer from "./slice/listSlice";

export default configureStore({
  reducer: {
    board: boardReducer,
    list: listReducer,
    job: jobReducer,
  },
});

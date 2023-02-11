import { createSlice } from "@reduxjs/toolkit";
import { sort } from "./listSlice";

const JobSlice = createSlice({
  name: "job",
  initialState: {
    "job-0": {
      id: "job-0",
      boardId: "board-0",
      listId: "list-0",
      jobTitle: "Developer",
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      companyTitle: "My Job",
      color: "red",
    },
    "job-10": {
      id: "job-10",
      boardId: "board-0",
      listId: "list-0",
      jobTitle: "Architect",
      companyTitle: "My Job",
      color: "red",
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    },
    "job-25": {
      id: "job-25",
      boardId: "board-0",
      listId: "list-0",
      color: "blue",
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      jobTitle: "SDE",
      companyTitle: "Jobs",
    },
    "job-1": {
      id: "job-1",
      boardId: "board-0",
      listId: "list-1",
      jobTitle: "Engineer",
      color: "green",
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      companyTitle: "Google",
    },

    "job-2": {
      id: "job-2",
      boardId: "board-0",
      listId: "list-2",
      color: "red",
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      jobTitle: "intern",
      companyTitle: "FaceBook",
    },
    "job-3": {
      id: "job-3",
      boardId: "board-0",
      listId: "list-3",
      jobTitle: "Developer",
      color: "blue",
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      companyTitle: "Sf",
    },
  },
  reducers: {
    addNewJob: (state, { payload }) => {
      const { id, boardId, listId, jobTitle, companyTitle } = payload;

      state[id] = {
        id,
        boardId,
        listId,
        jobTitle,
        companyTitle,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      };
    },
    updateJob: (state, { payload }) => {
      const { id } = payload;
      state[id] = payload;
      state[id].updatedAt = new Date().getTime();
    },
    deleteJob: (state, { payload }) => {
      const { id } = payload;
      delete state[id];
    },
  },
  extraReducers(builder) {
    builder.addCase(sort, (state, action) => {
      const { draggableId } = action.payload;
      state[draggableId].updatedAt = new Date().getTime();
    });
  },
});
export const { addNewJob, updateJob, deleteJob } = JobSlice.actions;

export default JobSlice.reducer;

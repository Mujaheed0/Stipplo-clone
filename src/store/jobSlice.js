import { createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({
  name: "job",
  initialState: {
    "job-0": {
      id: "job-0",
      boardId: "board-0",
      listId: "list-0",
      jobTitle: "Developer",
      companyTitle: "My Job",
    },
    "job-10": {
      id: "job-10",
      boardId: "board-0",
      listId: "list-0",
      jobTitle: "banana",
      companyTitle: "My Job",
    },
    "job-25": {
      id: "job-25",
      boardId: "board-0",
      listId: "list-0",
      jobTitle: "apple",
      companyTitle: "My Job",
    },
    "job-1": {
      id: "job-1",
      boardId: "board-0",
      listId: "list-1",
      jobTitle: "Engineer",
      companyTitle: "Google",
    },

    "job-2": {
      id: "job-2",
      boardId: "board-0",
      listId: "list-2",
      jobTitle: "Developer",
      companyTitle: "FaceBook",
    },
    "job-3": {
      id: "job-3",
      boardId: "board-0",
      listId: "list-3",
      jobTitle: "Developer",
      companyTitle: "Sf",
    },
  },
  reducers: {
    addNewJob: (state, { payload }) => {
      const { id, boardId, listId, jobTitle, companyTitle } = payload;
      state[id] = { id, boardId, listId, jobTitle, companyTitle };
    },
    updateJob: (state, { payload }) => {
      const { id } = payload;
      state[id] = payload;
    },
    deleteJob: (state, { payload }) => {
      const { id } = payload;
      delete state[id];
    },
  },
});
export const { addNewJob, updateJob, deleteJob } = JobSlice.actions;

export default JobSlice.reducer;

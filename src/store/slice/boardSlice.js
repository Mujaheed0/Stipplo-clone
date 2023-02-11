import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    "board-0": {
      id: "board-0",
      lists: ["list-0", "list-1", "list-2", "list-3"],
      name: "My Board 0",
      createdAt: new Date().getTime(),
    },
    "board-1": {
      id: "board-1",
      lists: ["list-4", "list-5", "list-6", "list-7"],
      name: "My Board 1",
      createdAt: new Date().getTime(),
    },
  },
  reducers: {
    addBoard: (state, { payload }) => {
      const { name, id } = payload;
      const newId = `board-${id}`;
      const newBoard = {
        name,
        id: newId,
        createdAt: new Date().getTime(),
        lists: [],
      };
      state[newId] = newBoard;
    },
    updateBoard: (state, { payload }) => {
      const { name, id } = payload;
      const board = state[id];
      board.name = name;
      state[id] = board;
    },
    deleteBoard: (state, { payload }) => {
      const { id } = payload;
      delete state[id];
    },
    listSort: (state, { payload }) => {
      const { droppableIndexEnd, droppableIndexStart, type, boardId } = payload;

      // draggin lists around - the listOrderReducer should handle this
      if (type === "list") {
        const [removed] = state[boardId].lists.splice(droppableIndexStart, 1);
        state[boardId].lists.splice(droppableIndexEnd, 0, removed);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(listSort, (state, action) => {});
  },
});
export const { addBoard, updateBoard, deleteBoard, listSort } =
  boardSlice.actions;

export default boardSlice.reducer;

import { createSlice, current } from "@reduxjs/toolkit";
import { sort } from "./listSlice";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    "board-0": {
      id: "board-0",
      lists: ["list-0", "list-1", "list-2", "list-3"],
      name: "My Board",
      dateCreated: new Date().toLocaleDateString(),
    },
    "board-1": {
      id: "board-1",
      lists: ["list-0", "list-1", "list-2", "list-3"],
      name: "My Board",
      dateCreated: new Date().toLocaleDateString(),
    },
  },
  reducers: {
    addBoard: (state, { payload }) => {
      const { name, id } = payload;
      const newId = `board-${id}`;
      const newBoard = {
        name,
        id: newId,
        dateCreated: new Date().toLocaleDateString(),
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
    listSort:(state,{payload})=>{
      
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        type,
        boardId,
      } = payload;

      // draggin lists around - the listOrderReducer should handle this
      if (type === "list") {
        const [removed]= state['board-1'].lists.splice(droppableIndexStart,1);
        state['board-1'].lists.splice(droppableIndexEnd,0,removed);

      }
    }
  },
  extraReducers(builder) {
    builder.addCase(listSort, (state, action) => {
    
    });
  },
});
export const { addBoard, updateBoard, deleteBoard,listSort } = boardSlice.actions;

export default boardSlice.reducer;

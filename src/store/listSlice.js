import { createSlice,current } from "@reduxjs/toolkit";
import { addNewJob, deleteJob, updateJob } from "./jobSlice";

const listSlice = createSlice({
  name: "list",
  initialState: {
    "list-0": {
      id: "list-0",
      jobsList: ["job-0","job-10","job-25"],
      title: "Wishlist",
      boardId: "board-0",
    },
    "list-1": {
      id: "list-1",
      jobsList: ["job-1"],
      title: "Offered",

      boardId: "board-0",
    },
    "list-2": {
      id: "list-2",
      jobsList: ["job-2"],
      title: "Rejected",

      boardId: "board-0",
    },
    "list-3": {
      id: "list-3",
      jobsList: ["job-3"],
      title: "Applied",

      boardId: "board-0",

    },
  },reducers:{
    sort:(state,{payload})=>{
  console.log(payload)
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        type
      } = payload;

      // draggin lists around - the listOrderReducer should handle this
      if (type !== "list") {
        
      

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        const card = list.jobsList.splice(droppableIndexStart, 1);
        list.jobsList.splice(droppableIndexEnd, 0, ...card);
        state[droppableIndexEnd]=list
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state[droppableIdStart];
        // pull out the job from this list
        const job = listStart.jobsList.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = state[droppableIdEnd];

        // put the job in the new list
        listEnd.jobsList.splice(droppableIndexEnd, 0, ...job);
       
          state[droppableIdStart]= listStart;
          state[droppableIdEnd]=listEnd
        
      }
    }
  }
  },
  extraReducers(builder){
    builder.addCase(addNewJob,(state,action)=>{
      console.log(action);
      console.log(action,state)
      const {id,listId}=action.payload;
      const jobslist=state[listId]['jobsList'];
      jobslist.push(id);
    });
    builder.addCase(deleteJob,(state,action)=>{
 
      const {id,listId}=action.payload;
      state[listId]['jobsList']=  state[listId]['jobsList'].filter(i=>i!==id)
      

    })
  }
});
export const {sort}=listSlice.actions;

export default listSlice.reducer;

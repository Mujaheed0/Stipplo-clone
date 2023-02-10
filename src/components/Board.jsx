import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import React from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listSort } from "../store/boardSlice";
import { sort } from "../store/listSlice";
import ListItems from "./ListItem";
import { StrictDroppable } from "./StrictDroppable";

function Board() {
  let params = useParams();
  console.log(params)
  const { boardId } = params;
  const boards = useSelector((state) => state.board);
  const board = boards[boardId];
  const lists = useSelector((state) => state.list);
  const jobs = useSelector((state) => state.job);
  let dispatch = useDispatch();
  if (!board) return <div>Board Not Found</div>;
  const listOrder = board.lists;
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    console.log(destination, source, draggableId, type);
    if (type === "list")
      return dispatch(
        listSort({
          droppableIdStart: source.droppableId,
          droppableIdEnd: destination.droppableId,
          droppableIndexEnd: destination.index,
          droppableIndexStart: source.index,
          draggableId,
          type,
        })
      );
    dispatch(
      sort({
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexEnd: destination.index,
        droppableIndexStart: source.index,
        draggableId,
        type,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full h-full overflow-y-hidden mt-4 bg-gray-50 flex flex-col gap-3">
        <h3 className="px-8 max-w-sm">{board.name}</h3>
        <div className=" pl-8 max-w-sm flex">
          <Input
            allowClear
            className="rounded-r-none outline-none"
            placeholder="Search for any job"
          ></Input>
          <Button className="bg-blue-400 rounded-l-none border-transparent items-center flex text-white h-full rounded-r-lg">
            <SearchOutlined className=""></SearchOutlined>
          </Button>
        </div>

        <div className=" flex overflow-x-auto flex-grow h-full pb-3">
          <div className="flex  px-8">
            <StrictDroppable
              droppableId={String("id")}
              type="list"
              direction="horizontal"
            >
              {(provided) => (
                <div
                  className="flex h-full"
                  key={Math.random()}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {listOrder.map((i, index) => {
                    const list = lists[i];

                    if (list) {
                      const jobsList = list.jobsList.map(
                        (jobListId) => jobs[jobListId]
                      );
                      return (
                        <Draggable 
                          draggableId={String(list.id)}
                          index={index}
                          key={String(list.id)}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              key={index}
                              className="w-80 h-full mr-2   bg-white px-4 pt-4  rounded-xl shadow-xl flex flex-col  "
                            >
                              <ListItems
                                provided={provided}
                                listId={list.id}
                                title={list.title}
                                index={index}
                                jobsList={jobsList}
                              ></ListItems>
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                  })}

                  {provided.placeholder}
                </div>
              )}
            </StrictDroppable>
          </div>{" "}
        </div>
      </div>
    </DragDropContext>
  );
}

export default Board;

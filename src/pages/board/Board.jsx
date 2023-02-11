import { BackwardOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import ListItems from "../../components/ListItems";
import { listSort } from "../../store/slice/boardSlice";
import { sort } from "../../store/slice/listSlice";
function Board() {
  const [searchValue, setSearchValue] = useState("");
  let params = useParams();
  const [filteredLists, setFilteredList] = useState(new Set());
  console.log(params);
  const { boardId } = params;
  const boards = useSelector((state) => state.board);
  const board = boards[boardId];
  const lists = useSelector((state) => state.list);
  const jobs = useSelector((state) => state.job);
  let dispatch = useDispatch();
  const navigate = useNavigate();
  if (!board) return <div>Board Not Found</div>;
  const listOrder = board.lists;

  const searchFilter = (e) => {
    if (e === "") {
      setFilteredList((e) => new Set());
      setSearchValue("");
      return;
    }
    setSearchValue(e);
    listOrder.forEach((i) => {
      lists[i].jobsList.forEach((job) => {
        if (
          jobs[job].jobTitle.includes(e) ||
          jobs[job].companyTitle.includes(e)
        )
          setFilteredList((e) => e.add(i));
      });
    });
  };
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
          boardId: boardId,
        })
      );
    dispatch(
      sort({
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexEnd: destination.index,
        droppableIndexStart: source.index,
        draggableId,

        boardId: boardId,
        type,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full h-full overflow-y-hidden mt-4 bg-gray-50 flex flex-col gap-3">
        <div className="flex px-8 gap-3">
          <BackwardOutlined
            className="text-xl"
            onClick={() => navigate({ pathname: "/" })}
          ></BackwardOutlined>
          <h3 className=" max-w-sm">{board.name}</h3>
        </div>
        <div className=" pl-8 max-w-sm flex">
          <Input setFilterSearch={searchFilter}></Input>
        </div>

        <div className=" flex overflow-x-auto flex-grow h-full pb-3">
          <div className="flex  px-8">
            <Droppable
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
                      if (searchValue) {
                        return filteredLists.has(i) ? (
                          <div
                            key={index}
                            className="w-80 h-full mr-2   bg-white px-4 pt-4  rounded-xl shadow-xl flex flex-col  "
                          >
                            <ListItems
                              listId={list.id}
                              searchValue={searchValue}
                              title={list.title}
                              index={index}
                              jobsList={jobsList}
                            ></ListItems>
                          </div>
                        ) : null;
                      }
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
                    return true;
                  })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>{" "}
        </div>
      </div>
    </DragDropContext>
  );
}

export default Board;

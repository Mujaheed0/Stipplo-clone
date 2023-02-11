import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React, { useState } from "react";
import JobForm from "./JobForm";
import JobList from "./JobList";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { addNewJob } from "../store/slice/jobSlice";
import { useForm } from "antd/es/form/Form";
import { Droppable } from "react-beautiful-dnd";
function ListItems({ jobsList, listId, title, provided, searchValue }) {
  const [sortValue, setSortValue] = useState("");
  console.log({ listId });
  const [form] = useForm();

  const [showModal, setShowModal] = useState(false);
  const getSortedList = (sortValue) => {
    console.log(sortValue);
    if (sortValue === "") return jobsList;
    if (sortValue === "companyTitle" || sortValue === "jobTitle") {
      jobsList.sort((a, b) =>
        a[sortValue].toLowerCase() > b[sortValue].toLowerCase() ? 1 : -1
      );
      console.log(jobsList);
      return jobsList;
    }
    if (sortValue === "oldest") {
      return jobsList.sort((a, b) => a.createdAt - b.createdAt);
    }
    if (sortValue === "newest") {
      return jobsList.sort((a, b) => b.createdAt - a.createdAt);
    }
  };
  console.log(jobsList);
  const sortedjobList = getSortedList(sortValue);
  const dispatch = useDispatch();
  const handleOk = () => {
    const formValues = form.getFieldsValue();
    console.log(formValues);
    dispatch(
      addNewJob({
        companyTitle: formValues.companyTitle,
        jobTitle: formValues.jobTitle,
        id: Math.floor(Math.random() * 100),
        boardId: "board-0",
        listId: listId,
      })
    );
    form.resetFields();
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setShowModal(false);
    form.resetFields();
  };

  const menuProps = {
    items: [
      {
        key: "1",
        label: "Sort by",
        children: [
          {
            key: "companyTitle",
            label: "Company Name",
          },
          {
            key: "jobTitle",
            label: "Position Added",
          },
          {
            key: "oldest",
            label: "Oldest Added",
          },
          {
            key: "newest",
            label: "Newest Added",
          },
        ],
      },
    ],
    onClick: (e) => setSortValue(e.key),
  };
  return (
    <div
      className="flex flex-col h-full overflow-auto"
      ref={provided?.innerRef}
    >
      <div
        className="flex justify-between items-center"
        {...provided?.dragHandleProps}
      >
        <div className="flex flex-col gap-1">
          <div>{title}</div>
          <div>{jobsList.length} jobs</div>
        </div>
        <Dropdown trigger={["click"]} menu={menuProps}>
          <Button className="flex justify-center items-center text-xl  outline-none border-none shadow-none cursor-pointer hover:text-blue-400">
            <MoreOutlined className="flex text-xl  justify-center"></MoreOutlined>
          </Button>
        </Dropdown>
      </div>
      <Button
        onClick={() => setShowModal(true)}
        className="hover:text-blue-400  hover:border-blue-400 cursor-pointer  w-full border-solid rounded-2xl mt-4 border-gray-500  border flex justify-center items-center py-1"
      >
        <PlusOutlined className="text-sm " />
      </Button>
      <div className="mt-2   overflow-y-auto h-full overflow-auto flex-1 flex flex-col ">
        <Droppable droppableId={String(listId)} type="job">
          {(provided) => (
            <div
              className="gap-2 flex flex-col  flex-1"
              {...provided.droppableProps}
              ref={provided.innerRef}
              key={listId}
            >
              {jobsList.length &&
                sortedjobList?.map((i, index) => (
                  <>
                    <JobList
                      searchValue={searchValue}
                      key={String(i?.id)}
                      index={index}
                      jobData={i}
                    ></JobList>
                  </>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

      <Modal
        open={showModal}
        onCancel={handleCancel}
        onOk={handleOk}
        title={`Add a new job to ${title}`}
        cancelText="Close"
        cancelButtonProps={{ className: "text-gray-600 text-center " }}
        okText="Add Job"
        okButtonProps={{ className: "bg-blue-500" }}
      >
        <JobForm form={form} handleOk={handleOk}></JobForm>
      </Modal>
    </div>
  );
}

export default ListItems;

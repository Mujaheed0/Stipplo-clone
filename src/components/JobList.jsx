import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import Modal from "antd/es/modal/Modal";
import { formatDistance, subDays, subSeconds } from "date-fns";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { deleteJob, updateJob } from "../store/slice/jobSlice";
import JobForm from "./JobForm";

function JobList({ jobData, index, searchValue }) {
  const [open, setOpen] = useState(false);
  const [isDelete, setisDelete] = useState(false);
  const [title, setTitle] = useState("");

  const [confirmLoading, setConfirmLoading] = useState(false);
  let dispatch = useDispatch();
  const format = (updatedAt) => {
    return formatDistance(updatedAt, new Date(), {
      addSuffix: true,
    });
  };
  const [form] = useForm();

  const handleOk = () => {
    const formValues = form.getFieldsValue();
    dispatch(
      updateJob({
        companyTitle: formValues.companyTitle,
        jobTitle: formValues.jobTitle,
        id: jobData.id,
        createdAt: jobData.createdAt,
        boardId: jobData.boardId,
        listId: jobData.listId,
      })
    );

    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setTitle("");
      setConfirmLoading(false);
      form.resetFields();
    }, 2000);
  };
  let updatedAt = format(new Date(jobData.updatedAt));

  const handleDelete = (e) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setTitle("");
      setConfirmLoading(false);
      setisDelete(false);

      dispatch(deleteJob({ id: jobData.id, listId: jobData.listId }));
      console.log(jobData.id);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setTitle("");
    setisDelete(false);
    form.resetFields();
  };

  if (
    searchValue &&
    (jobData.jobTitle.includes(searchValue) ||
      jobData.companyTitle.includes(searchValue))
  ) {
    return (
      <>
        <div className="flex gap-2 relative h-20 rounded-lg shadow-lg border-solid border border-gray-50 ">
          <div className="w-2 bg-red-400 rounded-l-lg"></div>
          <div className="flex gap-2 flex-grow mr-12 items-center">
            <div className="w-11 h-11 flex items-center rounded-full bg-gray-100 justify-center text-xl">
              M
            </div>
            <div className="flex flex-col gap-0">
              <div className="text-gray-400">
                {updatedAt === "less than a minute ago"
                  ? "a few seconds ago"
                  : updatedAt}
              </div>
              <div className="font-semibold text-gray-600">
                {jobData.companyTitle}
              </div>
              <div className=" text-gray-400">{jobData.jobTitle}</div>
            </div>
            <div className="absolute top-0 right-0 flex flex-col items-center h-full p-2 pr-4 gap-1">
              <>
                <EditOutlined
                  onClick={() => {
                    setOpen(true);
                    setTitle("Update Job Info");
                  }}
                  className="text-lg text-gray-400  hover:text-gray-600 hover:shadow-xl border border-solid rounded-lg px-1 py-1 flex items-center "
                />
                <DeleteOutlined
                  className="text-lg text-gray-400 hover:text-red-400 hover:shadow-xl border border-solid flex items-center py-1  rounded-lg px-1"
                  onClick={() => {
                    setOpen(true);
                    setTitle(
                      `Delete Job -${jobData.jobTitle} at ${jobData.companyTitle}`
                    );
                    setisDelete(true);
                  }}
                ></DeleteOutlined>
              </>
            </div>
          </div>
        </div>
        <Modal
          title={title}
          open={open}
          onOk={isDelete ? handleDelete : handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText={isDelete ? "Delete" : "Update"}
          cancelText="Close"
        >
          {!isDelete && (
            <JobForm
              form={form}
              data={{
                companyTitle: jobData.companyTitle,
                jobTitle: jobData.jobTitle,
              }}
              handleOk={handleOk}
            ></JobForm>
          )}
        </Modal>
      </>
    );
  }
  if (!searchValue) {
    return (
      <>
        <Draggable
          draggableId={String(jobData.id)}
          index={index}
          key={String(jobData.id)}
        >
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className="flex gap-2 relative h-20 rounded-lg shadow-lg border-solid border border-gray-50 "
            >
              <div
                className={`w-2 bg-${jobData.color}-400 rounded-l-lg`}
                style={{ background: jobData.color }}
              ></div>
              <div className="flex gap-2 flex-grow mr-12 items-center">
                <div className="w-11 h-11 flex items-center rounded-full bg-gray-100 justify-center text-xl">
                  {jobData.companyTitle.substring(0, 1)}
                </div>
                <div className="flex flex-col gap-0">
                  <div className="text-gray-400">
                    {updatedAt === "less than a minute ago"
                      ? "a few seconds ago"
                      : updatedAt}
                  </div>
                  <div className="font-semibold text-gray-600">
                    {jobData.companyTitle}
                  </div>
                  <div className=" text-gray-400">{jobData.jobTitle}</div>
                </div>
                <div className="absolute top-0 right-0 flex flex-col items-center h-full p-2 pr-4 gap-1">
                  <>
                    <EditOutlined
                      onClick={() => {
                        setOpen(true);
                        setTitle("Update Job Info");
                      }}
                      className="text-lg text-gray-400  hover:text-gray-600 hover:shadow-xl border border-solid rounded-lg px-1 py-1 flex items-center "
                    />
                    <DeleteOutlined
                      className="text-lg text-gray-400 hover:text-red-400 hover:shadow-xl border border-solid flex items-center py-1  rounded-lg px-1"
                      onClick={() => {
                        setOpen(true);
                        setTitle(
                          `Delete Job -${jobData.jobTitle} at ${jobData.companyTitle}`
                        );
                        setisDelete(true);
                      }}
                    ></DeleteOutlined>
                  </>
                </div>
              </div>
            </div>
          )}
        </Draggable>

        <Modal
          title={title}
          open={open}
          onOk={isDelete ? handleDelete : handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText={isDelete ? "Delete" : "Update"}
          cancelText="Close"
        >
          {!isDelete && (
            <JobForm
              form={form}
              data={{
                companyTitle: jobData.companyTitle,
                jobTitle: jobData.jobTitle,
              }}
              handleOk={handleOk}
            ></JobForm>
          )}
        </Modal>
      </>
    );
  }
}

export default JobList;

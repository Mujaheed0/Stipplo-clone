import React, { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import ModalForm from "./ModalForm";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { deleteBoard, updateBoard } from "../store/slice/boardSlice";
import { NavLink } from "react-router-dom";
import { formatDistance } from "date-fns";
function BoardList({ data }) {
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const [isDelete, setisDelete] = useState(false);
  const [title, setTitle] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  let dispatch = useDispatch();

  const handleOk = () => {
    const updatedBoardName = form.getFieldValue()["Name"];
    dispatch(updateBoard({ id: data.id, name: updatedBoardName }));
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setTitle("");
      setConfirmLoading(false);
    }, 2000);
  };

  const handleDelete = () => {
    dispatch(deleteBoard({ id: data.id }));
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setTitle("");
      setConfirmLoading(false);
      setisDelete(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setTitle("");
    setisDelete(false);
    form.resetFields();
  };

  const [show, setShow] = useState(true);
  return (
    <>
      <div
        onMouseLeave={() => setShow(false)}
        onMouseEnter={(e) => setShow(true)}
        className="w-full relative  rounded-xl no-underline  hover:shadow-xl  bg-gray-100 h-28  px-5 py-3 flex justify-between"
      >
        <NavLink
          to={`/board/${data.id}`}
          className="flex flex-col gap-2 w-full no-underline justify-center"
        >
          <div className="text-gray-500 ">
            {formatDistance(new Date(data.createdAt), new Date(), {
              addSuffix: "true",
            })}
          </div>
          <div className="font-bold text-gray-800 ">{data.name}</div>
          <div className="text-gray-700">{data.lists.length} Lists</div>
        </NavLink>
        {show && (
          <div className=" text-xl  flex justify-between items-center top-0  mr-5 w-20">
            <EditOutlined
              onClick={() => {
                setOpen(true);
                setTitle("Rename Board Name");
              }}
              className="hover:shadow-lg hover:bg-white  hover:text-gray-500 text-gray-400 rounded-md p-2"
            />

            <DeleteOutlined
              className="hover:shadow-lg text-gray-400 hover:bg-white hover:text-red-500 rounded-md p-2"
              onClick={() => {
                setOpen(true);
                setTitle(`Delete Board -${data.name}`);
                setisDelete(true);
              }}
            />
          </div>
        )}
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
            <ModalForm
              form={form}
              data={{ name: data.name }}
              handleOk={handleOk}
            ></ModalForm>
          )}
        </Modal>
      </div>
    </>
  );
}

export default BoardList;

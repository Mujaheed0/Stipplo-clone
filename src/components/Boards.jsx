import React, { useState } from "react";
import { Modal } from "antd";
import "antd/dist/reset.css";
import BoardList from "./BoardList";
import ModalForm from "./ModalForm";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { useForm } from "antd/es/form/Form";
import { addBoard } from "../store/boardSlice";
function Boards() {
  const boards = useSelector((state) => state.board);
  const [form]=useForm();
  const dispatch=useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    
    const boardName=form.getFieldsValue()['Name'];
    setConfirmLoading(true);
  dispatch(addBoard({id:boardName,name:boardName}));
    setTimeout(() => {
      setShowModal(false);
      setConfirmLoading(false);
      form.resetFields();
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    form.resetFields();
    setShowModal(false);
  };
  return (
    <>
      <div className="  mx-8 my-6  px-4 flex flex-col gap-4">
        <div className="font-bold text-2xl text-gray-800">Boards</div>
        <Button
          type="primary"
          onClick={() => setShowModal(true)}
          className=" w-full text-white rounded-2xl font-bold flex justify-center py-1"
        >
          + Add a new Board
        </Button>
        {Object.keys(boards).map((key,index) => {
        
          return (
            
         
              <BoardList key={boards[key]['id']} data={boards[key]}></BoardList>
      
          );
        })}
      </div>
      <Modal
        title="Add a New Board"
        open={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        okText="Save"
        cancelText="Close"
      >
        <ModalForm form={form} onFinish={handleOk}></ModalForm>
      </Modal>
    </>
  );
}

export default Boards;

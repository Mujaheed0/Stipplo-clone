

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const App = ({buttonText,modalTitle,children,element,...props}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (<>
    
    <EditOutlined onClick={() => setOpen(true)}/>
    
        <Modal
        title={modalTitle}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel} okText="Save" cancelText='Close'
      >
        <p>{children}</p>
      </Modal>
    </>
  );
};

export default App;
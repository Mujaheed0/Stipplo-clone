import { Button, Form, Input } from 'antd';
import React from 'react';




const App= ({form,handleOk,data}) => {

  const onFinish = (values) => {
    console.log(values);
  };
  const initialValues={
    "Name":data?.name||""
  }



  return (
    <Form layout='vertical' initialValues={initialValues}
      form={form}
      name="control-hooks"
      onFinish={handleOk}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="Name" label="Name" >
        <Input placeholder='Name of your new job board' />
      </Form.Item>
      
    </Form>
  );
};

export default App;
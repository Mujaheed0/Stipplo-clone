import { Button, Form, Input } from 'antd';
import React from 'react';




const App= ({form,handleOk,data}) => {

  const onFinish = (values) => {
    console.log(values);
  };
  const initialValues={
    "companyTitle":data?.companyTitle?data.companyTitle:'',
    "jobTitle":data?.jobTitle?data.jobTitle:""
  }



  return (
    <Form layout='vertical' initialValues={initialValues}
      form={form}
      name="control-hooks"
      onFinish={handleOk}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="companyTitle" label="Company Title" >
        <Input placeholder='Name of Company' />

      </Form.Item>
      
      <Form.Item name="jobTitle" label="Job Title" >
        <Input placeholder='Enter Job Title' />

      </Form.Item>
      
    </Form>
  );
};

export default App;
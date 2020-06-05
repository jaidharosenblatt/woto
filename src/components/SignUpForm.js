import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import './SignUpForm.css'


const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
    password: '${label} is not a validate password!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const SignUpForm = () => {
  const onFinish = values => {
    console.log(values);
  };

  return (

    <div className ="container">
    <p className = "header"> Be among the first to <b>revolutionize</b> office hours </p>
    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} labelCol = {{span: 24, offset: 0}}>
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]} >
        <Input />
      </Form.Item>

      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email',required: true  }]}>
        <Input />
      </Form.Item>

      <Form.Item name={['user', 'age']} label="Graduation Year" rules={[{ type: 'number', min: 0, max: 2350, required: true  }]}>
        <InputNumber />
      </Form.Item>

      <Form.Item name={['user', 'website']} label="Password" rules={[{ type: 'password',required: true  }]}>
        <Input />
        Must be at least 6 characters
      </Form.Item>

      <Form.Item >
        Already have an account? <a href=""> Sign in </a> here
        <Button type="primary" block htmlType="submit">
          Get Started
        </Button>
      </Form.Item>

    </Form>
    </div>
  );
};



export default SignUpForm;

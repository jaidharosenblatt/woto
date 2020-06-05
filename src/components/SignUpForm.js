import React from 'react';
import { Form, Input, InputNumber, Button,CheckBox } from 'antd';
import './SignUpForm.css'


const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
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
    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

// class SignUpForm extends React.Component{
//   render(){
//     return (
//       <div className="form container">
//         <Form>
//           <Form.Item>
//           <Input label = "Username" value="Please enter a Username" />
//           </Form.Item>
//         </Form>
//       </div>
//   );
//   }
// }


export default SignUpForm;

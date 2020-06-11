import React from "react";
import { Form, Input, InputNumber, Button, Col, Row } from "antd";
<<<<<<< HEAD
import "./AddCourseForm.css";
=======
>>>>>>> 2bc71d4ad03fec15df1f943d3b089d7b23e05200
import { Logo } from "../../../static/Images";

/**
 * @MatthewSclar
 *Component used on Add Course Page
 *Add Course Form
 */

<<<<<<< HEAD

 const validateMessages = {
   required: "${label} is required!",
   types: {
     email: "${label} is not validate email!",
     number: "${label} is not a validate number!",
     password: "${label} is not a validate password!",
   },
   number: {
     range: "${label} must be between ${min} and ${max}",
   },
 };

 const AddCourseForm = () => {
   const onFinish = (values) => {
     console.log(values);
   };

   return (
     <div className = "form">
     <Col>
       <Row>
         <Col lg={0}>
           <img src={Logo} alt="Woto Logo" />
         </Col>
       </Row>
       <Row align="center">
         <h2 className="header">
           Welcome. Please join your first course
         </h2>
       </Row>

       <Row>
         <Form
           name="nest-messages"
           onFinish={onFinish}
           validateMessages={validateMessages}
           labelCol={{ span: 24, offset: 0 }}
         >
           <Form.Item
             name={["user", "name"]}
             label="Name"
             rules={[{ required: true }]}
           >
             <Input size="large" />
           </Form.Item>

           <Form.Item
             name={["user", "email"]}
             label="Email"
             rules={[{ type: "email", required: true }]}
           >
             <Input size="large" />
           </Form.Item>

           <Form.Item
             name={["user", "age"]}
             label="Graduation Year"
             rules={[{ type: "number", min: 0, max: 2350, required: true }]}
           >
             <InputNumber size="large" />
           </Form.Item>

           <Form.Item
             name={["user", "website"]}
             label="Password"
             rules={[{ type: "password", required: true }]}
           >
             <Input.Password size="large" />
             Must be at least 6 characters
           </Form.Item>

           <Form.Item>
             Already have an account? <a href=""> Sign in </a> here
             <Button type="primary" block htmlType="submit">
               Get Started
             </Button>
           </Form.Item>
         </Form>
       </Row>
     </Col>
   </div>
   );
 };

 export default AddCourseForm;
=======
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
    password: "${label} is not a validate password!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AddCourseForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return <div className="form">form</div>;
};

export default AddCourseForm;
>>>>>>> 2bc71d4ad03fec15df1f943d3b089d7b23e05200

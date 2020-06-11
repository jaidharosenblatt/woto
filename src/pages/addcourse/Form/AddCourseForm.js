import React from "react";
import { Form, Input, InputNumber, Button, Col, Row } from "antd";
import { Logo } from "../../../static/Images";

/**
 * @MatthewSclar
 *Component used on Add Course Page
 *Add Course Form
 */

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

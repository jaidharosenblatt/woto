import React, { useState, useEffect } from "react";
import { Col, Form, Button } from "antd";
import { PasswordInput } from "antd-password-input-strength";
import { Link } from "react-router-dom";
import "./SignUp.css";
import EduEmail from "./EduEmail";
import TextInputReq from "../../components/form/TextInputReq";
import SchoolSelect from "./SchoolSelect";
import API from "../../api/API";

/**
 * @MatthewSclar and @jaidharosenblatt
 * first stage of signup process where the user creates their
 * profile (name, email, password)
 */
const SignUpForm = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState();

  useEffect(() => {
    async function getSchools() {
      const res = await API.getInstitutions();
      setSchools({ schools: res });
    }
    getSchools();
  }, []);

  const getSchoolFromId = (id) => {
    return schools.schools.find((school) => school["_id"] === id);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Col span={24}>
      <Form onFinish={onFinish} layout="vertical" className="sign-up">
        <TextInputReq
          label="First Name"
          name="firstName"
          placeholder="Kyle"
          message="Please include your first name"
        />
        <TextInputReq
          label="Last Name"
          name="lastName"
          placeholder="Sobel"
          message="Please include your last name"
        />

        <SchoolSelect
          schools={schools.schools}
          onChange={(value) => {
            setSelectedSchool(getSchoolFromId(value).domain);
          }}
        />
        <EduEmail school={selectedSchool} />

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input a password" }]}
        >
          <PasswordInput />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Get Started
          </Button>
          <p>
            Already have an account?
            <Link to="/signin"> Sign in </Link>
            here
          </p>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default SignUpForm;

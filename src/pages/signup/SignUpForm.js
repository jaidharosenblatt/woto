import React, { useState, useEffect } from "react";
import { Col, Form, Button } from "antd";
import { PasswordInput } from "antd-password-input-strength";
import { Link } from "react-router-dom";
import "./SignUp.css";
import EduEmail from "../../components/form/EduEmail";
import TextInputReq from "../../components/form/TextInputReq";
import SchoolSelect from "../../components/form/SchoolSelect";
import API from "../../api/API";
import RoleSegControl from "../../components/form/RoleSegControl";
import GraduationYearInput from "../../components/form/GraduationYearInput";

/**
 * @MatthewSclar and @jaidharosenblatt
 * first stage of signup process where the user creates their
 * profile (name, email, password)
 */
const SignUpForm = () => {
  const [schools, setSchools] = useState([]);
  const [role, setRole] = useState("student");
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

  const onFinish = async (values) => {
    const res = await API.register(values);
    console.log(res);
  };

  return (
    <Col span={24}>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinish}
        initialValues={{
          role: role,
        }}
        layout="vertical"
        className="sign-up"
      >
        <RoleSegControl
          handleRoleSelect={(event) => {
            setRole(event.target.value);
          }}
        />
        <TextInputReq
          label="First Name"
          name="firstName"
          placeholder="Kyle"
          message="Please input your first name"
        />
        <TextInputReq
          label="Last Name"
          name="lastName"
          placeholder="Sobel"
          message="Please input your last name"
        />

        <SchoolSelect
          schools={schools.schools}
          onChange={(value) => {
            setSelectedSchool(getSchoolFromId(value).domain);
          }}
        />
        <EduEmail school={selectedSchool} />
        {role !== "instructor" && <GraduationYearInput />}
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

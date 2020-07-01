import React, { useState, useEffect, useContext } from "react";
import { Col, Form, Button } from "antd";
import { PasswordInput } from "antd-password-input-strength";
import { Link } from "react-router-dom";
import "./SignUp.css";
import EduEmail from "../../components/form/EduEmail";
import TextInputReq from "../../components/form/TextInputReq";
import SchoolSelect from "../../components/form/SchoolSelect";
import API from "../../api/API";
import UserTypeSegControl from "../../components/form/UserTypeSegControl";
import GraduationYearInput from "../../components/form/GraduationYearInput";
import { AuthContext } from "../../contexts/AuthContext";

/**
 * @MatthewSclar and @jaidharosenblatt
 * first stage of signup process where the user creates their
 * profile (name, email, password.
 */
const SignUpForm = () => {
  const [schools, setSchools] = useState([]);
  const [userType, setUserType] = useState("student");
  const [selectedSchool, setSelectedSchool] = useState();
  const context = useContext(AuthContext);

  //Store list of schools in schools state
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
    const userType = values.userType;
    const user = {
      name: values.firstName,
      email: values.email,
      password: values.password,
      institution: values.institution,
    };
    const res = await API.register(user, userType);
    context.dispatch({
      type: "REGISTER",
      payload: { user: { ...user }, userType },
    });
    console.log(res);
  };

  return (
    <Col span={24}>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinish}
        initialValues={{
          userType: userType,
        }}
        layout="vertical"
        className="sign-up"
      >
        <UserTypeSegControl
          handleChange={(event) => {
            setUserType(event.target.value);
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
        {userType !== "instructor" && <GraduationYearInput />}
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

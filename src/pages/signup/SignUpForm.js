import React, { useState, useEffect, useContext } from "react";
import { Col, Form, Button, Input } from "antd";
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
  const [error, setError] = useState("");
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

  const path = window.location.pathname; //url of the current page
  const split = path.split("="); //this creates an array with key ([0] element) and value ([1] element)
  const key = split[1];

  useEffect(() => {
    async function verifyUser() {
      try {
      } catch (error) {
        if (error.response.status === 401) {
          setError("You are already enrolled in this course");
        } else {
          setError(
            "Invalid course code. Please contact your instructor to receive another code"
          );
        }
        console.log("Failed:", error);
      }
    }
    verifyUser();
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
    try {
      const res = await API.register(user, userType);
      context.dispatch({
        type: "REGISTER",
        payload: { user: { ...res }, userType },
      });
      if (key) {
        const course = await API.courseEnroll({ accessKey: key });
        console.log(course);
      }
      window.location.reload();
    } catch (error) {
      if (error.response.status === 400) {
        setError("Sorry, an account already exists under this email");
      }
    }
  };

  return (
    <Col span={24}>
      {key && (
        <p>
          If you were invited to join a course, you will automatically join the
          course once you sign up
        </p>
      )}

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
        <EduEmail error={error} school={selectedSchool} />
        {userType !== "instructor" && <GraduationYearInput />}
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input a password" }]}
        >
          <PasswordInput />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        {error !== "" && <p className="error">{error}</p>}

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

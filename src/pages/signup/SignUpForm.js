import React, { useState, useEffect, useContext } from "react";
import { Col, Form, Button } from "antd";
import { Link } from "react-router-dom";
import "./SignUp.css";
import PasswordWithConfirm from "../../components/form/PasswordWithConfirm";
import EduEmail from "../../components/form/EduEmail";
import TextInputReq from "../../components/form/TextInputReq";
import SchoolSelect from "../../components/form/SchoolSelect";
import API from "../../api/API";
import UserTypeSegControl from "../../components/form/UserTypeSegControl";
import GraduationYearInput from "../../components/form/GraduationYearInput";
import { AuthContext, actions } from "../../contexts/AuthContext";

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
      name: values.name,
      email: values.email.toLowerCase(),
      password: values.password,
      institution: values.institution,
      graduationYear: values.graduationYear,
    };
    try {
      const res = await API.register(user, userType);
      context.dispatch({
        type: actions.REGISTER,
        payload: { user: { ...res }, userType },
      });
      if (key) {
        const course = await API.courseEnroll({ accessKey: key });
        console.log(course);
      }
    } catch (error) {
      console.log(error);
      setError("Sorry, an account already exists under this email");
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
          label="Name"
          name="name"
          placeholder="Kyle Sobel"
          message="Please input your name"
        />

        <SchoolSelect
          schools={schools.schools}
          onChange={(value) => {
            setSelectedSchool(getSchoolFromId(value).domain);
          }}
        />
        <EduEmail required error={error} school={selectedSchool} />
        {userType !== "instructor" && <GraduationYearInput />}
        <PasswordWithConfirm required />
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

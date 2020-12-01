import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";
import auth from "../../redux/auth/actionCreators";
import selectors from "../../redux/selectors";

/**
 * @MatthewSclar and @jaidharosenblatt
 * first stage of signup process where the user creates their
 * profile (name, email, password.
 */
const SignUpForm = (props) => {
  const [schools, setSchools] = useState([]);
  const [userType, setUserType] = useState("student");
  const [selectedSchool, setSelectedSchool] = useState();

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
    props.register(user, userType);
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
        <EduEmail required error={props.error} school={selectedSchool} />
        {userType !== "instructor" && <GraduationYearInput />}
        <PasswordWithConfirm required />
        {props.error && <p className="error">{props.error}</p>}

        <Form.Item>
          <Button
            loading={props.loading}
            type="primary"
            block
            htmlType="submit"
          >
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

const { register } = auth;
const mapStateToProps = (state) => {
  return {
    loading: selectors.getLoading(state),
    error: selectors.getError(state),
  };
};
export default connect(mapStateToProps, { register })(SignUpForm);

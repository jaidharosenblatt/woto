import React, { useState } from "react";
import { Form, Input, Space } from "antd";
import TextInputReq from "../../../components/form/TextInputReq";
import SubmitButton from "../../../components/form/SubmitButton";
import "../addcourse.css";
import API from "../../../api/API";


// const semesters = ["Summer 2020", "Fall 2020"];
/**
 * @MatthewSclar @jaidharosenblatt Form for adding a new course
 * Gets a list of schools and their properties to do validation
 * Conditionally renders depending on userType (student/TA/instructor)
 */

const AddCourseForm = ({createCourse}) => {
  const [error, setError] = useState("");


  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const res = await API.postCourses(values);
      console.log(res);
      createCourse(res);
    } catch (error) {
      console.error(error);
      setError("Unable to create course");
    }
  };

  const onFinishFailed = (errorInfo) => {
    setError("Please enter a course number");
    console.log("Failed:", errorInfo);
  };



  return (
    <>

      <Space align="center" direction="vertical">
        <h2 className="header" style={{textAlign:"center"}}>Create a new course</h2>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <TextInputReq
            label="Course Title"
            name="name"
            placeholder="Intro to Compsci"
            message="Please enter a course title"
          />
          {/* <DataSelect
          required
          message="Please enter a term"
          name="term"
          label="Term"
          placeholder="Select the term of your course"
          options={semesters}
        /> */}

          <Form.Item
            label="Course Number"
            name="code"
            help={error}
            validateStatus={error !== "" ? "error" : "validating"}
            colon={false}
            rules={[{ required: true }]}
          >
            <Input placeholder="CS101" />
          </Form.Item>
          <SubmitButton CTA="Create Course" />
          </Form>
        </Space>

    </>
  );
};

export default AddCourseForm;

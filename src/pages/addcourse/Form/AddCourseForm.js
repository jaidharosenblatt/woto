import React from "react";
import { Form, Input, Button, Col, Row, InputNumber } from "antd";

import SegmentedControlD from "./SegmentedControlD";
import {Logo} from "../../../static/Images";
import TextInput from "../../help/Form/TextInput";
import SubmitButton from "../../help/Form/SubmitButton"
/**
 * @MatthewSclar
 *Component used on Add Course Page
 *Add Course Form
 */

class AddCourseForm extends React.Component {
  constructor(){
    super();
    this.state= {isStudent: true, isTeacher: false, isTA: false};
  }

  handleOnChange = (event) => {
    if (event.target.name === "formcontroller"){
      if(event.target.value === 'Student'){
        this.setState({ isStudent: true, isTeacher: false, isTA:false });
      }
      if(event.target.value === 'Teaching Assistant'){
      this.setState({ isTA: true, isStudent: false, isTeacher:false });

    }
      if(event.target.value === 'Teacher'){
      this.setState({ isTeacher: true, isStudent:false, isTA:false });
    }
    }
  };

  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render(){
    const studentFields = this.state.isStudent ? (
      <div>
      <Form.item label = "Year">
        <InputNumber min ={2020} max ={2300} defaultValue ={2021} />
      </Form.item>
      </div>
    ) : null;


    return(
      <Form
        initialValues={{
          isStudent: true,
          isTA: false,
          isTeacher: false,
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        layout="vertical">

        <Row align ="center">
          <Col md={0}>
            <img src={Logo} alt="Woto Logo" />
          </Col>
        </Row>

        <Row align="center">
          <h2 className="header">
          &nbsp;
            <b style={{ fontStyle: "bold", color: "#40a9ff" }}>
              Welcome.&nbsp;
            </b>
            Please join a course to get started
          </h2>
        </Row>

        <Row align="center">
          <Col xs={24}>
            <SegmentedControlD
              name="formcontroller"
              label="I am a"
              onChange={this.handleOnChange}
              options={["Student", "Teaching Assistant", "Teacher"]}
              values ={["Student", "Teaching Assistant", "Teacher"]}/>

          </Col>
        </Row>

        <Row>
          <Col xs={24}>
            <TextInput
            label = "Institution"
            name="instituion"
            placeholder="Duke University" />
          </Col>
        </Row>
      
        <Row>
          <Col xs={24}>
            <TextInput
            label = "Course Code"
            name="coursecode"
            placeholder="ABC123" />
          </Col>
        </Row>
        <Row>
          <Col xs = {24}>
            <SubmitButton CTA="Join Course"/>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default AddCourseForm;

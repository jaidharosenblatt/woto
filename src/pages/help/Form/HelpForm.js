import React from "react";
import { Form } from "antd";

import "./Form.css";
import SegmentedControl from "./SegmentedControl";
import AssignmentProblemInput from "./AssignmentProblemInput";
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const HelpForm = () => {
  return (
    <Form
      initialValues={{
        questionType: "assignment",
        assignment: 1,
        problem: 1,
        collaborate: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <SegmentedControl
        value="questionType"
        option1="Assignment"
        value1="assignment"
        option2="Concept"
        value2="concept"
      />
      <AssignmentProblemInput />

      <TextInput
        label="Question"
        name="question"
        placeholder="How do I reverse a linked list..."
      />
      <SegmentedControl
        value="collaborate"
        option1="Collaborate while I wait"
        value1={true}
        option2="I prefer to wait alone"
        value2={false}
      />
      <TextInput
        label="Zoom URL"
        name="zoomUrl"
        placeholder="duke.zoom.us/j/123456789"
      />
      <SubmitButton />
    </Form>
  );
};

export default HelpForm;

import React from "react";
import { Form, Col } from "antd";
import "./Form.less";
import SegmentedControl from "./SegmentedControl";
import AssignmentProblemInput from "./AssignmentProblemInput";
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";
import TagSelect from "./TagSelect";
import StageSelect from "./StageSelect";

/**
 * @jaidharosenblatt question submit form for students.
 * Uses custom styled components in this folder by passing
 * in props. Conditionally renders based on user's choice
 * between assignment/concept and collab/alone
 */
class HelpForm extends React.Component {
  constructor() {
    super();
    this.state = { isAssignment: true, collaborate: true };
  }
  handleOnChange = (event) => {
    if (event.target.name === "isAssignment")
      this.setState({ isAssignment: event.target.value });
    if (event.target.name === "collaborate")
      this.setState({ collaborate: event.target.value });
  };

  // Temporary
  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    // Conditionally render based on if user is asking about an assignment
    const assignmentFields = this.state.isAssignment ? (
      <div>
        <AssignmentProblemInput />
        <StageSelect
          name="stage"
          label="Stage"
          placeholder="Where do you think you are in the problem?"
        />
        <TagSelect
          name="concepts"
          label="Concepts"
          placeholder="Tag your question"
        />
      </div>
    ) : null;

    // Conditionally render based on if user opts into collaboration
    const meetingUrl = this.state.collaborate ? (
      <TextInput
        label="Meeting URL"
        name="meetingUrl"
        placeholder="https://duke.zoom.us/j/123456789"
      />
    ) : null;

    return (
      <Form
        initialValues={{
          isAssignment: true,
          assignment: 1,
          problem: 1,
          collaborate: true,
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        layout="vertical"
      >
        <SegmentedControl
          name="isAssignment"
          onChange={this.handleOnChange}
          option1="Assignment"
          value1={true}
          option2="Concept"
          value2={false}
        />
        {assignmentFields}
        <TextInput
          label="Question"
          name="question"
          placeholder="How do I reverse a linked list..."
        />
        {/*  
          Fixing text on mobile to use different text
          */}
        <Col xs={0} md={24}>
          <SegmentedControl
            name="collaborate"
            option1="Collaborate while I wait"
            onChange={this.handleOnChange}
            value1={true}
            option2="I prefer to wait alone"
            value2={false}
          />
        </Col>
        <Col xs={24} md={0}>
          <SegmentedControl
            name="collaborate"
            option1="Collaborate"
            onChange={this.handleOnChange}
            value1={true}
            option2="Wait alone"
            value2={false}
          />
        </Col>
        {meetingUrl}
        <SubmitButton CTA="Get Help Now!" />
      </Form>
    );
  }
}

export default HelpForm;

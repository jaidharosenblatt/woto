import React from "react";
import { Form } from "antd";
import "../Help.css";
import SegmentedControl from "../../../components/form/SegmentedControl";
import AssignmentProblemInput from "./AssignmentProblemInput";
import TextInput from "../../../components/form/TextInput";
import SubmitButton from "../../../components/form/SubmitButton";
import DataSelect from "../../../components/form/DataSelect";
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
    //temp
    const concepts = ["Linked List", "Array", "Queue", "Algorithms"];

    // Conditionally render based on if user is asking about an assignment
    const assignmentFields = this.state.isAssignment ? (
      <div>
        <AssignmentProblemInput />
        <StageSelect
          name="stage"
          label="Stage"
          placeholder="Where do you think you are in the problem?"
        />
        <DataSelect
          mode="tags"
          name="concepts"
          label="Concepts"
          placeholder="Tag your question"
          options={concepts}
        />
      </div>
    ) : null;

    // Conditionally render based on if user opts into collaboration
    const meetingUrl = this.state.collaborate ? (
      <TextInput
        label="Meeting URL for Collaboration"
        name="meetingUrl"
        placeholder="https://duke.zoom.us/j/123456789"
      />
    ) : null;

    return (
      <Form
        initialValues={{
          isAssignment: true,
          collaborate: true,
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        layout="vertical"
      >
        <SegmentedControl
          name="isAssignment"
          onChange={this.handleOnChange}
          options={[
            {
              label: "Assignment",
              value: true,
            },
            {
              label: "Concept",
              value: false,
            },
          ]}
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

        <SegmentedControl
          name="collaborate"
          options={[
            {
              label: "Collaborate while I wait",
              labelMobile: "Collaborate",
              value: true,
            },
            {
              label: "I prefer to wait alone",
              labelMobile: "Wait Alone",
              value: false,
            },
          ]}
          onChange={this.handleOnChange}
        />

        {meetingUrl}
        <SubmitButton CTA="Get Help Now!" />
      </Form>
    );
  }
}

export default HelpForm;

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
 * @param {props} button (optional) replace "submit"with a passed in <Button> wrapped in a <Form.Item>
 * @param {props} initialValues (optional) initial values for form
 * assignment: "hw1",
 * collaborate: true,
 * concepts: ["Dynamic Programming"],
 * isAssignment: true,
 * meetingUrl: "duke.zoom.us/1234567890",
 * problem: "Problem 3b",
 * question: "Learning ",
 * stage: "improvingSolution",
 */
class HelpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAssignment: true, collaborate: true };
  }
  handleOnChange = (event) => {
    if (event.target.name === "isAssignment")
      this.setState({ isAssignment: event.target.value });
    if (event.target.name === "collaborate")
      this.setState({ collaborate: event.target.value });
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
          isAssignment: this.state.isAssignment,
          collaborate: this.state.collaborate,
        }}
        onFinish={this.props.onFormSubmit}
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
        {this.props.button === undefined ? (
          <SubmitButton CTA="Get Help Now!" />
        ) : (
          this.props.button
        )}
      </Form>
    );
  }
}

export default HelpForm;

import React from "react";
import { Form } from "antd";
import "../Help.css";
import TextInput from "../../../components/form/TextInput";
import SubmitButton from "../../../components/form/SubmitButton";
import DataSelect from "../../../components/form/DataSelect";

/**
 * @jaidharosenblatt question submit form for students.
 * Uses custom styled components in this folder by passing
 * in props. Conditionally renders based on user's choice
 * between assignment/concept and collab/alone
 * @param {props} CTA call to action for submit button
 * @param {props} initialValues (optional) initial values for form
 * @param {props} onFormSubmit handle the form submit button
 */
const HelpForm = (props) => {
  //temp
  const assignments = ["N/A", "Assignment 1", "APT 2"];
  const stages = [
    "N/A",
    "Just started the problem",
    "Understand the problem but no solution",
    "Debugging a solution",
    "Improving/checking a solution",
  ];
  const concepts = ["Linked List", "Array", "Queue", "Algorithms"];

  return (
    <Form
      initialValues={props.initialValues}
      onFinish={props.onFormSubmit}
      layout="vertical"
      style={{ width: "100%" }}
    >
      <DataSelect
        mode="tags"
        name="assignment"
        label="Assignment"
        placeholder="Select the assignments your question is about"
        required
        message="Please include an assignment or select N/A"
        options={assignments}
      />
      <DataSelect
        name="stage"
        label="Stage"
        placeholder="Where do you think you are in the problem?"
        required
        message="Please include a stage or select N/A"
        options={stages}
      />
      <DataSelect
        mode="tags"
        name="concepts"
        label="Concepts"
        placeholder="Select concepts related to your question"
        required
        message="Please add concepts to your question"
        options={concepts}
      />
      <TextInput
        label="Details"
        name="details"
        placeholder="Add more details to your question"
      />
      <SubmitButton CTA={props.CTA} />
    </Form>
  );
};

export default HelpForm;

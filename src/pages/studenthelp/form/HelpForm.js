import React from "react";
import { Form } from "antd";
import "../Help.css";
import TextInput from "../../../components/form/TextInput";
import TextInputReq from "../../../components/form/TextInputReq";
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
 * @param {props} mode switch between a question and a Woto (default is question)
 * @param {props} buttons (optional) add buttons to replace simple CTA
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

  const placeholders =
    props.mode === "woto"
      ? {
          assignment: "Select the assignment you are working on",
          stage: "Select what stage of the problem you are in",
          concepts: "Select the concepts related to this assignment",
          details: "Describe where you are in the assignment",
        }
      : {
          assignment: "Select any assignments related to your question",
          stage: "Select what stage of the problem you are in",
          concepts: "Select concepts related to your question",
          details: "Add more details to your question",
        };

  return (
    <Form
      initialValues={props.initialValues}
      onFinish={props.onFormSubmit}
      layout="vertical"
      style={{ width: "100%" }}
    >
      <DataSelect
        mode={props.mode !== "woto" && "tags"}
        name="assignment"
        label="Assignment"
        placeholder={placeholders["assignment"]}
        required
        message="Please include an assignment or select N/A"
        options={assignments}
      />
      <DataSelect
        name="stage"
        label="Stage"
        placeholder={placeholders["stage"]}
        required
        message="Please include a stage or select N/A"
        options={stages}
      />
      <DataSelect
        mode="tags"
        name="concepts"
        label="Concepts"
        placeholder={placeholders["concepts"]}
        required
        message="Please add concepts to your question"
        options={concepts}
      />

      {props.mode === "woto" && (
        <TextInputReq
          label="Video Meeting Room URL"
          message="Please include a meeting URL"
          name="meetingUrl"
          placeholder={"http://zoom.us/j/123456789"}
        />
      )}
      <TextInput
        label="Details"
        name="details"
        placeholder={placeholders["details"]}
      />
      {props.buttons}
      {props.CTA && <SubmitButton CTA={props.CTA} />}
    </Form>
  );
};

export default HelpForm;

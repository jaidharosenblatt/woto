import React from "react";
import { DatePicker, Form } from "antd";
import DataSelect from "../../components/form/DataSelect";

const { RangePicker } = DatePicker;

//TODO add onChange methods to forms and date picker

//need request to get this information for a specific session
const TimeOptions = ["1pm-3pm", "6pm-9pm"];

const TAOptions = [
  "All teaching assistants",
  "Marty Mcfly",
  "Tony Brans",
  "Dandy Chiggins",
];

const DateSelection = (page) => {
  switch (page) {
    case "At a Glance":
      return (
        <div>
          <Form
            style={{ display: "-webkit-box" }}
            initialValues={{ ta: TAOptions[0] }}
          >
            <RangePicker format="MMMM Do" style={{ marginRight: "10%" }} />{" "}
            <DataSelect name="ta" options={TAOptions} />
          </Form>
        </div>
      );
    case "Schedule Helper":
      return <RangePicker format="MMMM Do" />;
    case "Specific Session":
      return (
        <div>
          <Form
            style={{ display: "-webkit-box" }}
            initialValues={{ time: TimeOptions[0] }}
          >
            <RangePicker format="MMMM Do" style={{ marginRight: "10%" }} />{" "}
            <DataSelect name="time" options={TimeOptions} />
          </Form>
        </div>
      );
    case "Roster":
    case "Course Settings":
      return null;
    default:
      return <RangePicker format="MMMM Do" />;
  }
};

export default DateSelection;

import React from "react";
import { DatePicker, Form } from "antd";
import DataSelect from "../../form/DataSelect";

const { RangePicker } = DatePicker;

//TODO add onChange methods to forms and date picker

//need request to get this information for a specific session
//const TimeOptions = ["1pm-3pm", "6pm-9pm"];

const TAOptions = [
  "All teaching assistants",
  "Marty Mcfly",
  "Tony Brans",
  "Dandy Chiggins",
];

const DateSelectAtGlance = (props) => {
  return (
    <div>
      <Form
        style={{ display: "-webkit-box" }}
        initialValues={{ ta: TAOptions[0] }}
      >
        <RangePicker format="MMMM Do" style={{ marginRight: "10%" }} />{" "}
        <DataSelect
          name="ta"
          options={TAOptions}
          handleChange={props.taSelectChange}
        />
      </Form>
    </div>
  );
};

export default DateSelectAtGlance;

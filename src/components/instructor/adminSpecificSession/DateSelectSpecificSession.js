import React from "react";
import { DatePicker, Form } from "antd";
import DataSelect from "../../form/DataSelect";

const TimeOptions = ["1pm-3pm", "6pm-9pm"];
const dateFormat = "YYYY/MM/DD";

//TODO add onChange methods to forms and date picker

//need request to get this information for a specific session
//const TimeOptions = ["1pm-3pm", "6pm-9pm"];

const DateSelectSpecificSession = (props) => {
  return (
    <div>
      <Form
        style={{ display: "-webkit-box" }}
        initialValues={{ time: TimeOptions[0] }}
      >
        <DatePicker onChange={props.dateOnChange} format={dateFormat} />
        <br />
        <DataSelect
          name="time"
          options={TimeOptions}
          handleChange={props.timeOnChange}
        />
      </Form>
    </div>
  );
};

export default DateSelectSpecificSession;

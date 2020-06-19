import React from "react";
import { DatePicker, Cascader } from "antd";

const { RangePicker } = DatePicker;

//need request to get this information for a specific session
const options = [
  {
    value: "1pm-3pm",
    label: "1pm-3pm",
  },
  {
    value: "6pm-9pm",
    label: "6pm-9pm",
  },
];

const DateSelection = (page) => {
  switch (page) {
    case "At a Glance":
    case "Schedule Helper":
      return <RangePicker format="MMMM Do" />;
    case "Specific Session":
      return (
        <div>
          <RangePicker format="MMMM Do" /> <Cascader options={options} />
        </div>
      );
    case "Roster":
    case "Course Settings":
      return null;
    case "default":
      return <RangePicker format="MMMM Do" />;
  }
};

export default DateSelection;

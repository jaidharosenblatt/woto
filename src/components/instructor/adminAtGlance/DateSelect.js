import { DatePicker } from "antd";
import moment from "moment";
import React from "react";

export default function DateSelect() {
  function disabledDate(current) {
    // Can not select days after today
    return current > moment().endOf("day");
  }

  function handleChange(update) {
    console.log(update);
  }

  return (
    <DatePicker.RangePicker
      format="ll"
      onCalendarChange={handleChange}
      defaultValue={[moment().subtract(1, "months"), moment()]}
      disabledDate={disabledDate}
    />
  );
}

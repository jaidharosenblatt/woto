import { DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";

export default function DateSelect() {
  const [start, setStart] = useState(moment().subtract(1, "months"));
  const [end, setEnd] = useState(moment());

  function disabledDate(current) {
    // Can not select days after today
    return current > moment().endOf("day");
  }

  function handleChange(range) {
    if (!range || range.length === 0) {
      return;
    }
    setStart(range[0]);
    setEnd(range[1]);

    console.log(start?._d, end?._d);
  }

  return (
    <DatePicker.RangePicker
      format="ll"
      onCalendarChange={handleChange}
      defaultValue={[start, end]}
      disabledDate={disabledDate}
    />
  );
}

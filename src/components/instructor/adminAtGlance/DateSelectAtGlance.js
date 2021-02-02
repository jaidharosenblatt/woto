import React from "react";
import { DatePicker, Select, Space } from "antd";

const { RangePicker } = DatePicker;

const DateSelectAtGlance = () => {
  return (
    <Space>
      <RangePicker format="MMMM Do" />
      <Select>
        <Select.Option>hl</Select.Option>
      </Select>
    </Space>
  );
};

export default DateSelectAtGlance;

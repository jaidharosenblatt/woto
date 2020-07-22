import React from "react";
import { Form, InputNumber } from "antd";
import DataSelect from "./DataSelect";
const GraduationYearInput = () => {
  return (
    <DataSelect
      label="Graduation Year"
      name="graduationYear"
      message="Please input your graduation year"
      required
      options={[2021, 2022, 2023, 2024]}
    />
  );
};

export default GraduationYearInput;

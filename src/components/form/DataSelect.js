import React from "react";
import { Form, Select } from "antd";

/**
 * Temporary options
 */
const { Option } = Select;

/**
 * @jaidharosenblatt Select field that allows user to use the select field with
 * an array of options
 * @param options the options to provide
 * @param mode the antd mode of the Select field ex "tags"
 */
const DataSelect = ({
  required,
  message,
  mode,
  name,
  label,
  placeholder,
  options = [],
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: { message } }]}
    >
      <Select mode={mode} style={{ width: "100%" }} placeholder={placeholder}>
        {options.map((option) => {
          return <Option key={option}>{option}</Option>;
        })}
      </Select>
    </Form.Item>
  );
};

export default DataSelect;

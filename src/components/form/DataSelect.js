import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

/**
 * @jaidharosenblatt Select field that allows user to use the select field with
 * an array of options
 * @param props refer to ant design Select field
 */
const DataSelect = (props) => {
  return (
    <Form.Item
      name={props.name}
      label={props.label}
      rules={[{ required: props.required, message: props.message }]}
    >
      <Select
        mode={props.mode}
        style={{ width: "100%" }}
        placeholder={props.placeholder}
        onChange={props.handleChange}
      >
        {props.options.map((option) => {
          return <Option key={option}>{option}</Option>;
        })}
      </Select>
    </Form.Item>
  );
};

export default DataSelect;

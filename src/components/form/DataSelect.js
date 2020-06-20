import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

/**
 * @jaidharosenblatt Select field that allows user to use the select field with
 * an array of options (to be used in a form)
 * Refer to ant design Select field documentation for more details
 * @param {props} options the options for the form (values are same as what is displayed)
 * @param {props} name the value for the form
 * @param {props} label a vertical label for the field
 * @param {props} required whether or not this field is required
 * @param {props} message the error message for the field "Please input your name"
 * @param {props} name the value to be used in a form
 * @param {props} mode "tags" or "multiple" (default)
 * @param {props} placeholder placeholder in field
 * @param {props} handleChange callback function for field change
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

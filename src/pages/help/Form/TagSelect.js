import React from "react";
import { Form, Select } from "antd";

/**
 * Temporary options
 */
const { Option } = Select;
const children = [];
const temp = ["Linked List", "Array", "Queue", "Algorithms"];
temp.forEach((tag) => children.push(<Option key={tag}>{tag}</Option>));

/**
 * @jaidharosenblatt Select field that allows user to tag
 * @param {*} name the name of the field to output
 */
const TagSelect = ({ name, label, placeholder }) => {
  return (
    <Form.Item name={name} label={label}>
      <Select mode="tags" style={{ width: "100%" }} placeholder={placeholder}>
        {children}
      </Select>
    </Form.Item>
  );
};

export default TagSelect;

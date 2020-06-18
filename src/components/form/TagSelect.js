import React from "react";
import { Form, Select } from "antd";

/**
 * Temporary options
 */
const { Option } = Select;

/**
 * @jaidharosenblatt Select field that allows user to tag their responses
 * @param tags the tags from past answers
 */
const TagSelect = ({ name, label, placeholder, tags = [] }) => {
  const options = [];
  tags.forEach((tag) => options.push(<Option key={tag}>{tag}</Option>));

  return (
    <Form.Item name={name} label={label}>
      <Select mode="tags" style={{ width: "100%" }} placeholder={placeholder}>
        {options}
      </Select>
    </Form.Item>
  );
};

export default TagSelect;

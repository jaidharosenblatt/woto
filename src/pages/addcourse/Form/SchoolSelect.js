import React from "react";
import { Select, Form } from "antd";

const { Option } = Select;

/**
 * @MatthewSclar
 * Component used on the AddCourseForm
 *
 */

const SchoolSelect = ({ onChange }) => {
  return (
    <Form.Item
      label="Institution"
      name="institution"
      rules={[{ required: true, message: "Please select an Institution" }]}
    >
      <Select onChange={onChange} placeholder="Duke University">
        <Option value="Duke University"> Duke University </Option>
        <Option value="UNC"> UNC </Option>
        <Option value="North Carolina State"> NC State </Option>
      </Select>
    </Form.Item>
  );
};

export default SchoolSelect;

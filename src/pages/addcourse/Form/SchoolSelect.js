import React from "react";
import { Select, Form } from "antd";

/**
 * @MatthewSclar
 * Component used on the AddCourseForm to get list of schools and their semester options
 */

const SchoolSelect = ({ schools, onChange }) => {
  return (
    <Form.Item
      label="Institution"
      name="institution"
      rules={[{ required: true, message: "Please select an Institution" }]}
    >
      <Select onChange={onChange} placeholder="Duke University">
        {Object.keys(schools).map((school) => {
          return (
            <Select.Option key={school} value={school}>
              {school.name}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

export default SchoolSelect;

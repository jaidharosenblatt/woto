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
        {schools
          ? schools.map((school) => {
              return (
                <Select.Option key={school._id} value={school._id}>
                  {school.name}
                </Select.Option>
              );
            })
          : console.log(schools)}
      </Select>
    </Form.Item>
  );
};

export default SchoolSelect;

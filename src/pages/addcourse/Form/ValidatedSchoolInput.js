import React from "react";
import { Form, Input } from "antd";

const ValidatedSchoolInput = (props) => {
  const schoolRegex = `^[A-Za-z0-9._%+-]+@${props.selectedSchool}.edu$`;

  return (
    <Form.Item
      label="University Email"
      name="email"
      colon={false}
      rules={[
        {
          required: true,
          pattern: schoolRegex,
          message: `Please enter a ${props.selectedSchool}.edu email`,
        },
      ]}
    >
      <Input placeholder={`abc123@${props.selectedSchool}.edu`} />
    </Form.Item>
  );
};

export default ValidatedSchoolInput;

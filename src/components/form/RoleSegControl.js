import React from "react";
import SegmentedControl from "./SegmentedControl";
import "./form.css";

const RoleSegControl = ({ handleRoleSelect }) => {
  return (
    <SegmentedControl
      name="role"
      onChange={handleRoleSelect}
      options={[
        {
          label: "Student",
          value: "student",
        },
        {
          label: "Assistant",
          value: "teachingAssistant",
        },
        {
          label: "Instructor",
          value: "instructor",
        },
      ]}
    />
  );
};

export default RoleSegControl;

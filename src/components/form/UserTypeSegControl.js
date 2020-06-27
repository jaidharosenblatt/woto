import React from "react";
import SegmentedControl from "./SegmentedControl";
import "./form.css";

const UserTypeSegControl = ({ handleChange }) => {
  return (
    <SegmentedControl
      name="userType"
      onChange={handleChange}
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

export default UserTypeSegControl;

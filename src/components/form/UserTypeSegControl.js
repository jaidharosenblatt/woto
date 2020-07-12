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
          label: "Student or Assistant",
          value: "student",
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

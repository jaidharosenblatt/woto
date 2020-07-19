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
          labelMobile: "Student or TA",
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

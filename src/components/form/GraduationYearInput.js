import React from "react";
import DataSelect from "./DataSelect";
const GraduationYearInput = () => {
  return (
    <DataSelect
      label="Graduation Year"
      name="graduationYear"
      message="Please input your graduation year"
      options={[2021, 2022, 2023, 2024, "Graduate Student"]}
    />
  );
};

export default GraduationYearInput;

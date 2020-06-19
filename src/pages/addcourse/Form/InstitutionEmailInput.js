import React from "react";
import TextInputReq from "../../../components/form/TextInputReq";

const InstitutionEmailInput = () => {
  return (
    <TextInputReq
      label="University Email"
      name="university email"
      placeholder="abc123@duke.edu"
      message="Please enter an email that corresponds to your selected Instituion"
    />
  );
};

export default InstitutionEmailInput;

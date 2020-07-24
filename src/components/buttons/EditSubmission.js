import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import EditSubmissionModal from "../modals/EditSubmissionModal";

const EditSubmission = ({ handleEdit, question }) => {
  console.log(question);
  return (
    <Popup
      element={
        <Button block type="primary">
          Edit My Submission
        </Button>
      }
      question={question}
      handleEdit={handleEdit}
      modal={EditSubmissionModal}
    />
  );
};

export default EditSubmission;

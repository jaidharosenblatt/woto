import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import WotoQuestionModal from "../modals/WotoQuestionModal";

const EditSubmission = ({ handleEdit, question }) => {
  return (
    <Popup
      element={
        <Button block type="primary">
          Edit My Submission
        </Button>
      }
      question={question}
      handleEdit={handleEdit}
      edit
      modal={WotoQuestionModal}
    />
  );
};

export default EditSubmission;

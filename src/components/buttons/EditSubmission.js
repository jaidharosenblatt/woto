import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import EditSubmissionModal from "../modals/EditSubmissionModal";

const EditSubmission = ({ question }) => {
  return (
    <Popup
      element={
        <Button type="primary" block>
          Edit My Submission
        </Button>
      }
      question={question}
      modal={EditSubmissionModal}
    />
  );
};

export default EditSubmission;

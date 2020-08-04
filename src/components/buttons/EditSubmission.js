import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import WotoQuestionModal from "../modals/WotoQuestionModal";

const EditSubmission = (props) => {
  return (
    <Popup
      element={<Button>Edit Question</Button>}
      {...props}
      edit
      modal={WotoQuestionModal}
    />
  );
};

export default EditSubmission;

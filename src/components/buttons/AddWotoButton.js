import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import WotoQuestionModal from "../modals/WotoQuestionModal";

const AddWotoButton = (props) => {
  return (
    <Popup
      element={
        <Button block type="primary">
          Create a Woto Room
        </Button>
      }
      {...props}
      discussion
      modal={WotoQuestionModal}
    />
  );
};

export default AddWotoButton;

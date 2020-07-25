import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import WotoQuestionModal from "../modals/WotoQuestionModal";

const JoinWotoButton = (props) => {
  return (
    <Popup
      element={<Button type="primary">Join the Woto Room</Button>}
      {...props}
      modal={WotoQuestionModal}
    />
  );
};

export default JoinWotoButton;

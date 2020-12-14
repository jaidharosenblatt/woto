import React from "react";
import { Button } from "antd";
import Popup from "../tools/Popup";
import CancelQuestionModal from "../CancelQuestionModal";

const EndInteractionButton = ({ handleLeave, CTA }) => {
  return (
    <Popup
      element={
        <Button danger size="large" block>
          End Interaction
        </Button>
      }
      handleLeave={handleLeave}
      modal={CancelQuestionModal}
    />
  );
};

export default EndInteractionButton;

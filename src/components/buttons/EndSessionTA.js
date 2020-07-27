import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import CancelQuestionModal from "../modals/CancelQuestionModal";

const EndSessionTA = ({ endSession }) => {
  return (
    <Popup
      element={
        <Button block type="primary" danger>
          End Session
        </Button>
      }
      handleLeave={endSession}
      modal={CancelQuestionModal}
    />
  );
};

export default EndSessionTA;

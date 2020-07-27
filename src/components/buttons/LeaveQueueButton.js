import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import CancelQuestionModal from "../modals/CancelQuestionModal";

const LeaveQueueButton = ({ handleLeave, CTA }) => {
  return (
    <Popup
      element={
        <Button block type="primary" danger>
          {CTA ? CTA : "Leave TA Queue"}
        </Button>
      }
      handleLeave={handleLeave}
      modal={CancelQuestionModal}
    />
  );
};

export default LeaveQueueButton;

import React from "react";
import { Button } from "antd";
import Popup from "../tools/Popup";
import CancelQuestionModal from "../CancelQuestionModal";

const LeaveQueueButton = ({ handleLeave, CTA }) => {
  return (
    <Popup
      element={<Button danger>{CTA ? CTA : "Leave Queue"}</Button>}
      handleLeave={handleLeave}
      modal={CancelQuestionModal}
    />
  );
};

export default LeaveQueueButton;

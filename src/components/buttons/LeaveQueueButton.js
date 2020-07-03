import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import CancelQuestionModal from "../modals/CancelQuestionModal";

const LeaveQueueButton = ({ handleLeave }) => {
  return (
    <Popup
      element={
        <Button type="primary" danger>
          Leave TA Queue
        </Button>
      }
      onAction={handleLeave}
      modal={CancelQuestionModal}
    />
  );
};

export default LeaveQueueButton;

import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import CancelQuestionModal from "../modals/CancelQuestionModal";

const LeaveQueueButton = ({ handleLeave }) => {
  return (
    <div className="leave-queue">
      <Popup
        element={
          <Button block type="primary" danger>
            Leave Queue
          </Button>
        }
        handleLeave={handleLeave}
        modal={CancelQuestionModal}
      />
    </div>
  );
};

export default LeaveQueueButton;

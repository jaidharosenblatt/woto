import React, { useContext } from "react";
import { Button } from "antd";
import { HelpContext } from "../../contexts/HelpContext";
import Popup from "../modals/tools/Popup";
import CancelQuestionModal from "../modals/CancelQuestionModal";

const LeaveQueueButton = () => {
  const { dispatch } = useContext(HelpContext);
  const handleLeave = () => {
    dispatch({
      type: "END",
    });
  };
  return (
    <Popup
      element={
        <Button type="primary" danger>
          Leave Queue
        </Button>
      }
      onAction={handleLeave}
      modal={CancelQuestionModal}
    />
  );
};

export default LeaveQueueButton;

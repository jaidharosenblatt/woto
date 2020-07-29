import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import LeaveWotoModal from "../modals/LeaveWotoModal";

const HideWotoButton = ({ handleLeave }) => {
  return (
    <Popup
      element={
        <Button type="primary" block danger>
          Remove
        </Button>
      }
      handleLeave={handleLeave}
      modal={LeaveWotoModal}
    />
  );
};

export default HideWotoButton;

import React from "react";
import { Button } from "antd";
import Popup from "../tools/Popup";
import SignOffModal from "../SignOffModal";

const TASignOffButton = ({ onSubmit }) => {
  return (
    <Popup
      element={
        <Button block type="primary" danger>
          Sign Off
        </Button>
      }
      signOff={onSubmit}
      modal={SignOffModal}
    />
  );
};

export default TASignOffButton;

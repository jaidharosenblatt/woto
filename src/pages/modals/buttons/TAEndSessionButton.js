import React from "react";
import { Button } from "antd";
import Popup from "../tools/Popup";
import EndSessionModal from "../EndSessionModal";

const TAEndSessionButton = ({ onSubmit }) => {
  return (
    <Popup
      element={
        <Button block type="primary" danger>
          End Session
        </Button>
      }
      endSession={onSubmit}
      modal={EndSessionModal}
    />
  );
};

export default TAEndSessionButton;

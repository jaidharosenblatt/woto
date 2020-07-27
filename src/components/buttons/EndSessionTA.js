import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import EndSessionModal from "../modals/EndSessionModal";

const EndSessionTA = ({ onSubmit }) => {
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

export default EndSessionTA;

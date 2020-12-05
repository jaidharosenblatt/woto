import React from "react";
import { Button } from "antd";
import Popup from "../tools/Popup";
import DeleteWotoModal from "../DeleteWotoModal";

const HideWotoButton = ({ handleLeave }) => {
  return (
    <Popup
      element={<Button danger>Delete</Button>}
      handleLeave={handleLeave}
      modal={DeleteWotoModal}
    />
  );
};

export default HideWotoButton;

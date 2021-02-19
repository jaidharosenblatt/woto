import React from "react";
import { Button } from "antd";
import Popup from "../tools/Popup";
import AnnouncementModal from "../AnnouncementModal";

const MakeAnnouncementButton = ({ course, onSubmit }) => {
  return (
    <Popup
      element={
        <Button block type="primary">
          Message Waiting Students
        </Button>
      }
      course={course}
      onSubmit={onSubmit}
      modal={AnnouncementModal}
    />
  );
};

export default MakeAnnouncementButton;

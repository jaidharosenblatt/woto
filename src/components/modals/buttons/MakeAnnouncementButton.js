import React from "react";
import { Button } from "antd";
import Popup from "../tools/Popup";
import AnnouncementModal from "../AnnouncementModal";

const MakeAnnouncementButton = ({ onSubmit, course }) => {
  return (
    <Popup
      element={
        <Button block type="primary">
          Make Announcement
        </Button>
      }
      course={course}
      modal={AnnouncementModal}
    />
  );
};

export default MakeAnnouncementButton;

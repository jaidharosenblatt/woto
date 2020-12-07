import React from "react";
import { Button } from "antd";
import Popup from "../tools/Popup";
import UnenrollModal from "../UnenrollModal";

const UnenrollButton = ({ course, handleUnenroll }) => {
  return (
    <div className="leave-queue">
      <Popup
        element={<Button block>Unenroll</Button>}
        course={course}
        handleUnenroll={handleUnenroll}
        modal={UnenrollModal}
      />
    </div>
  );
};

export default UnenrollButton;

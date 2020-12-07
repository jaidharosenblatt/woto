import React from "react";
import { Button } from "antd";
import Popup from "../tools/Popup";
import ActivateCourseModal from "../ActivateCourseModal";

const ActivateCourseButton = ({ course, handleActivate }) => {
  return (
    <div className="leave-queue">
      <Popup
        element={<Button block>Activate</Button>}
        course={course}
        handleUnenroll={handleActivate}
        modal={ActivateCourseModal}
      />
    </div>
  );
};

export default ActivateCourseButton;

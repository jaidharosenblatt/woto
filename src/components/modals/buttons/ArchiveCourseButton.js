import React from "react";
import { Button } from "antd";
import Popup from "../tools/Popup";
import ArchiveCourseModal from "../ArchiveCourseModal";

const ArchiveCourseButton = ({ course, handleArchive }) => {
  return (
    <div className="leave-queue">
      <Popup
        element={
          <Button danger block>
            Archive {course.code}
          </Button>
        }
        course={course}
        handleUnenroll={handleArchive}
        modal={ArchiveCourseModal}
      />
    </div>
  );
};

export default ArchiveCourseButton;

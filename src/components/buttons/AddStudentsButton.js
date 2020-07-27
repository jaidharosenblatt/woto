import React from "react";
import { Button } from "antd";
import Popup from "../modals/tools/Popup";
import StudentInput from "../../pages/addcourse/Form/StudentInput";

const AddStudentsButton = ({ course_id }) => {
  return (
    <div className="leave-queue">
      <Popup
        element={<Button>Add Students</Button>}
        course_id={course_id}
        modal={StudentInput}
      />
    </div>
  );
};

export default AddStudentsButton;

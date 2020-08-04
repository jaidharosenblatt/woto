import React from "react";
import { Avatar } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Popup from "../modals/tools/Popup";
import WotoQuestionModal from "../modals/WotoQuestionModal";

const styles = {
  editIcon: {
    color: "#40A9FF",
    backgroundColor: "#91D5FF",
  },
};
const EditSubmission = (props) => {
  return (
    <Popup
      element={
        <Avatar size="small" style={styles.editIcon}>
          <EditOutlined />
        </Avatar>
      }
      {...props}
      edit
      modal={WotoQuestionModal}
    />
  );
};

export default EditSubmission;

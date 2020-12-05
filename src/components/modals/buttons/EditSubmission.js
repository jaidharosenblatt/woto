import React from "react";
import { Avatar, Button, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Popup from "../tools/Popup";
import WotoQuestionModal from "../WotoQuestionModal";

const styles = {
  editIcon: {
    color: "white",
    backgroundColor: "#40A9FF",
  },
};
const EditSubmission = (props) => {
  return (
    <Popup
      element={
        props.button ? (
          <Button>Edit</Button>
        ) : (
          <Space>
            <h2>Your Question</h2>
            <Avatar size="small" style={styles.editIcon}>
              <EditOutlined />
            </Avatar>
          </Space>
        )
      }
      {...props}
      edit
      modal={WotoQuestionModal}
    />
  );
};

export default EditSubmission;

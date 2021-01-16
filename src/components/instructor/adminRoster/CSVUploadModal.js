import { Button, Space } from "antd";
import React from "react";
import CSVUploadDrop from "./CSVUploadDrop";

export default function CSVUploadModal(props) {
  return (
    <Space direction="vertical" style={{ width: "100%", maxWidth: 350 }}>
      <CSVUploadDrop />
      <Button block onClick={props.hideModal}>
        Confirm
      </Button>
    </Space>
  );
}

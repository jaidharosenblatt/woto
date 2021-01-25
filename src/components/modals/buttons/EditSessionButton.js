import { EditOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React from "react";
import OpenSessionForm from "../../ta/openjoin/OpenSessionForm";
import Popup from "../tools/Popup";

export default function EditSessionButton() {
  return (
    <Popup
      element={<EditOutlined style={{ fontSize: 12 }} />}
      modal={(props) => (
        <Space direction="vertical">
          <h2>Edit Session</h2>
          <OpenSessionForm CTA="Edit Session" {...props} />
        </Space>
      )}
    />
  );
}

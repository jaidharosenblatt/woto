import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import React from "react";

export default function CSVUploadButton() {
  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e);
      const students = e.target.result;
      console.log(students);
    };
    reader.readAsText(file);
  };

  return (
    <Upload
      accept=".csv"
      style={{ width: "100%" }}
      beforeUpload={beforeUpload}
      showUploadList={false}
    >
      <Button block>
        <UploadOutlined /> Upload from CSV
      </Button>
    </Upload>
  );
}

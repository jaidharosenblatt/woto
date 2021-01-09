import React from "react";

export default function CSVUpload() {
  return (
    <div>
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
    </div>
  );
}

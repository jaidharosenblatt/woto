import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import React from "react";
import { connect } from "react-redux";
import { csvToStudents } from "../../../redux/courses/actions/roster";

const CSVUploadButton = (props) => {
  return (
    <Upload
      accept=".csv"
      style={{ width: "100%" }}
      beforeUpload={props.csvToStudents}
      showUploadList={false}
    >
      <Button block>
        <UploadOutlined /> Upload from CSV
      </Button>
    </Upload>
  );
};

export default connect(null, { csvToStudents })(CSVUploadButton);

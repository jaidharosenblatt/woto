import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import React from "react";
import { connect } from "react-redux";
import { csvToStudents } from "../../../redux/courses/actions/roster";

const CSVUploadDrop = (props) => {
  return (
    <Upload.Dragger
      accept=".csv"
      style={{ width: "100%" }}
      beforeUpload={props.csvToStudents}
      showUploadList={false}
    >
      <h1>
        <InboxOutlined />
      </h1>
      <p>Upload your roster as a CSV</p>
    </Upload.Dragger>
  );
};

export default connect(null, { csvToStudents })(CSVUploadDrop);

import React from "react";
import { Button, Space } from "antd";
import { Logo } from "../../../static/LoadedImages";
import { Link } from "react-router-dom";
import "./addcourse.css";
import CSVUploadDrop from "../../instructor/adminRoster/CSVUploadDrop";

/**
 * @MatthewSclar
 * This is the second stage for the create course workflow for instructors
 *
 */

const AddStudents = ({ addedStudents }) => {
  return (
    <Space direction="vertical" style={{ width: "100%", maxWidth: 500 }}>
      <Link to="/">
        <Logo className="WotoLogo" />
      </Link>
      <CSVUploadDrop />

      <Button type="primary" block onClick={addedStudents}>
        Finish for Now
      </Button>
    </Space>
  );
};

export default AddStudents;

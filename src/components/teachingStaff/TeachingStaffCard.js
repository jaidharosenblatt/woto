import React from "react";
import { Row } from "antd";
import TeachingStaffItem from "./TeachingStaffItem";
import { TeacherImage } from "../../static/Images";

const TeachingStaffCard = () => {
  return (
    <div>
      <Row>
        <img style={{ marginRight: "4px" }} alt="teacher" src={TeacherImage} />
        <h2>Teaching Staff</h2>
      </Row>
      <TeachingStaffItem
        title="Jaidha Rosenblatt"
        status="Active"
        taType="Grad TA"
      />
      <TeachingStaffItem
        title="Kaden Rosenblatt"
        status="Helping Student"
        taType="UTA"
      />
      <TeachingStaffItem
        title="Mary Gooneratne"
        status="Inactive"
        taType="UTA"
      />
    </div>
  );
};

export default TeachingStaffCard;

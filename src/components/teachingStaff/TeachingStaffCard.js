import React from "react";
import { Row } from "antd";
import TeachingStaffItem from "./TeachingStaffItem";

const TeachingStaffCard = () => {
  return (
    <div>
      <Row>
        <h2 style={{ marginBottom: "4px" }}>Teaching Staff</h2>
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

import React from "react";
import { Row, Space } from "antd";
import TeachingStaffItem from "./TeachingStaffItem";

/**
 * @jaidharosenblatt temporary class for showing 3 TA items
 */
const TeachingStaffCard = () => {
  return (
    <div style={{ marginTop: "8px" }}>
      <Row>
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

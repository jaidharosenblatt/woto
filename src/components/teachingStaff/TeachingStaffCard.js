import React from "react";
import { Row } from "antd";
import TeachingStaffItem from "./TeachingStaffItem";

/**
 * @jaidharosenblatt temporary class for showing 3 TA items
 */
const TeachingStaffCard = () => {
  return (
    <div style={{ margin: "8px 0px" }}>
      <h2 style={{ margin: "8px 0px" }}>Teaching Staff</h2>
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

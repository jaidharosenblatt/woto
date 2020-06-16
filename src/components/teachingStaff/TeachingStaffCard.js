import React from "react";
import TeachingStaffItem from "./TeachingStaffItem";
import { DefaultProfile } from "../../static/Images";
/**
 * @jaidharosenblatt temporary class for showing 3 TA items
 */
const TeachingStaffCard = () => {
  return (
    <div style={{ margin: "8px 0px" }}>
      <h2 style={{ margin: "8px" }}>Teaching Staff</h2>
      <TeachingStaffItem
        title="Jaidha Rosenblatt"
        status="Active"
        taType="Grad TA"
        profilePic={DefaultProfile}
      />
      <TeachingStaffItem
        title="Kaden Rosenblatt"
        status="Helping Student"
        taType="UTA"
        profilePic={DefaultProfile}
      />
      <TeachingStaffItem
        title="Mary Gooneratne"
        status="Inactive"
        taType="UTA"
        profilePic={DefaultProfile}
      />
    </div>
  );
};

export default TeachingStaffCard;

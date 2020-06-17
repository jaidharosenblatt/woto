import React from "react";
import TeachingStaffItem from "./TeachingStaffItem";
import { DefaultProfile } from "../../static/Images";

const styles = {
  wrapper: { margin: "8px 0px" },
  h2: { margin: "8px" },
};

/**
 * @jaidharosenblatt temporary class for showing 3 TA items
 */
const TeachingStaffCard = () => {
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.h2}>Teaching Staff</h2>
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

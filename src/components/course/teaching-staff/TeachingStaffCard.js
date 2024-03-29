import React from "react";
import { Card, Avatar, List } from "antd";
import { DefaultProfile } from "../../../static/Images";
import util from "../../../util";
import "./TeachingStaff.css";

/**
 * @jaidharosenblatt renders a json object that has active staff for a session
 */
const TeachingStaffCard = ({ staffers }) => {
  if (!staffers || staffers[0] == null) {
    return null;
  }

  return (
    <Card title={<h2>Teaching Staff</h2>} className="Staff">
      <List
        itemLayout="horizontal"
        dataSource={staffers}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar || DefaultProfile} />}
              title={<p>{item.name || `Assistant ${index + 1}`}</p>}
              description={<h3>{util.getTitle(item.gradYear)}</h3>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TeachingStaffCard;

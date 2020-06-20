import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import "./Announcement.css";

const Announcement = () => {
  return (
    <div>
      <div>
        <label color="rgba(0, 0, 0, 0.85)">
          <InfoCircleOutlined className="Icon" />
          Announcements
        </label>
      </div>
      <Card>
        <p className="Announcement">
          {this.RenderAnnouncement(props.Announcement)}
        </p>
      </Card>
    </div>
  );
};

export default Announcement;

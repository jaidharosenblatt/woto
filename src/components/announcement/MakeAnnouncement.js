import React, { useState } from "react";
import { Card, Row, Col, Button, Input } from "antd";
import "./announcement.css";

/**
 * @jaidharosenblatt Used for TAs to make a new annoucemnt
 */
const MakeAnnouncement = ({ onSubmit }) => {
  const [announcement, setAnnouncement] = useState();
  return (
    <div className="make-announcement">
      <Col align="center" xs={24} md={18} style={{ paddingRight: 8 }}>
        <Input
          value={announcement}
          onChange={(value) => setAnnouncement(value.target.value)}
        />
      </Col>
      <Col align="center" xs={24} md={6}>
        <Button block type="primary" onClick={() => onSubmit(announcement)}>
          Make Announcement
        </Button>
      </Col>
    </div>
  );
};

export default MakeAnnouncement;

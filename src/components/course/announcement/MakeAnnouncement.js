import React, { useState } from "react";
import { Col, Button, Input } from "antd";
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
        <Button
          placeholder="Join my video room if you need a hint on problem 1..."
          block
          type="primary"
          onClick={() => onSubmit(announcement)}
        >
          Make Announcement
        </Button>
      </Col>
    </div>
  );
};

export default MakeAnnouncement;

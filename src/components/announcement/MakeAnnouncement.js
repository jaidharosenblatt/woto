import React, { useState } from "react";
import { Card, Row, Col, Button, Input } from "antd";
import "./announcement.css";

/**
 * @jaidharosenblatt Used for TAs to make a new annoucemnt
 */
const MakeAnnouncement = ({ onSubmit }) => {
  const [announcement, setAnnouncement] = useState();
  return (
    <Card className="announcement">
      <Row gutter={8}>
        <Col align="center" xs={12} md={18}>
          <Input
            value={announcement}
            onChange={(value) => setAnnouncement(value.target.value)}
          />
        </Col>
        <Col align="center" xs={12} md={6}>
          <Button block type="primary" onClick={() => onSubmit(announcement)}>
            Make Announcement
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default MakeAnnouncement;

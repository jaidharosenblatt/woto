import TextAreaInput from "../form/TextAreaInput";
import SegmentedControl from "../form/SegmentedControl";
import { Button, Space, Row, Col, Checkbox } from "antd";
import { BellIcon } from "./tools/Icons";
import React, { useState } from "react";
import { connect } from "react-redux";
import { makeAnnouncement } from "../../redux/courses/actions/ta";

const AnnouncementModal = (props) => {
  const [announcement, setAnnouncement] = useState();
  const headerThree = `Make an Announcement ${props.course}`;
  return (
    <Col>
      <Space direction="vertical">
        <Row>
          <Col span={7}>
            <BellIcon />
          </Col>
          <Col span={17} align="left">
            <h1>Announcement</h1>
            <h3>{headerThree}</h3>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col>
            Message
            <TextAreaInput
              autoSize={{ minRows: 5, maxRows: 10 }}
              value={announcement}
              onChange={(event) => setAnnouncement(event.target.value)}
            />
            <Row gutter={12}>
              <Col span={12}>
                <p>Include a video URL in my announcement?</p>
              </Col>
              <Col span={12}>
                <SegmentedControl
                  name="includeURL"
                  maxWidth="200px"
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </Col>
            </Row>
            <Button
              block
              type="primary"
              onClick={() => {
                props.makeAnnouncement(announcement);
                props.hideModal();
              }}
            >
              Send an Announcement to Class!
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default connect(null, { makeAnnouncement })(AnnouncementModal);

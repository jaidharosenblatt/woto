import React, { useState } from "react";
import { connect } from "react-redux";
import { Space, Row, Col, Form, Checkbox } from "antd";
import { BellIcon } from "./tools/Icons";
import SubmitButton from "../form/SubmitButton";
import { makeAnnouncement } from "../../redux/courses/actions/ta";
import TextAreaInput from "../form/TextAreaInput";
import VideoRoomUrl from "../form/VideoRoomUrl";

/*
 *Creates an Announcement Popup for making announcements
 *@Huvon Hutchinson-Goodridge
 */

const AnnouncementModal = (props) => {
  const [includeURL, setIncludeURL] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onFinish = async (changes) => {
    const { announcement, meetingURL } = changes;
    if (!meetingURL) {
      await props.makeAnnouncement(announcement, "");
    } else {
      await props.makeAnnouncement(announcement, meetingURL);
    }
    props.hideModal();
    setIncludeURL(false);
    console.log(includeURL);
    setDisabled(true);
  };

  const onFieldsChange = () => {
    setDisabled(false);
  };

  return (
    <Col>
      <Space direction="vertical">
        <Row type="flex" align="middle">
          <Col xs={5} md={3}>
            <BellIcon />
          </Col>
          <Col xs={19} md={21} align="left">
            <h1>Make an Announcement</h1>
          </Col>
        </Row>
        <Form
          onFinish={(changes) => onFinish(changes)}
          layout="vertical"
          onFieldsChange={onFieldsChange}
        >
          <Row>
            <Col>
              <Row gutter={[0, 14]}>
                Message all students waiting for {props.course} help
                <TextAreaInput
                  required
                  placeholder="Join my video room if you need a hint on problem 1..."
                  name="announcement"
                  autoSize={{ minRows: 5, maxRows: 10 }}
                  allowClear
                />
              </Row>
              <Row>
                <Col span={24} align="left">
                  <Checkbox
                    name="includeURL"
                    onChange={(e) => setIncludeURL(e.target.checked)}
                  >
                    Include a video URL in my announcement?
                  </Checkbox>
                </Col>
              </Row>
              {includeURL && (
                <Col span={24}>
                  <VideoRoomUrl />
                </Col>
              )}
            </Col>
          </Row>
          <SubmitButton
            CTA="Send Announcement to Class"
            disabled={disabled}
            block
          />
        </Form>
      </Space>
    </Col>
  );
};

export default connect(null, { makeAnnouncement })(AnnouncementModal);

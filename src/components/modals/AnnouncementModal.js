import SegmentedControl from "../form/SegmentedControl";
import { Space, Row, Col, Form } from "antd";
import { BellIcon } from "./tools/Icons";
import React, { useState } from "react";
import { connect } from "react-redux";
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
  const headerThree = `Make an Announcement ${props.course}`;

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

  const onChange = () => {
    setDisabled(false);
  };

  return (
    <Col>
      <Space direction="vertical">
        <Row type="flex" align="middle">
          <Col span={7}>
            <BellIcon />
          </Col>
          <Col span={17} align="left">
            <h1>Announcement</h1>
            <h3>{headerThree}</h3>
          </Col>
        </Row>
        <Form
          onFinish={(changes) => onFinish(changes)}
          layout="vertical"
          onFieldsChange={onChange}
        >
          <Row>
            <Col>
              <Row gutter={[0, 14]}>
                Message
                <TextAreaInput
                  required
                  placeholder="Join my video room if you need a hint on problem 1..."
                  name="announcement"
                  autoSize={{ minRows: 5, maxRows: 10 }}
                  allowClear
                />
              </Row>
              <Row>
                <Col span={12}>
                  <p>Include a video URL in my announcement?</p>
                </Col>
                <Col span={12} align="middle">
                  <SegmentedControl
                    name="includeURL"
                    initialValue={includeURL}
                    maxWidth="200px"
                    onChange={(event) => setIncludeURL(event.target.value)}
                    options={[
                      { label: "Yes", value: true },
                      { label: "No", value: false },
                    ]}
                  />
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
            CTA="Send an Announcement to Class"
            disabled={disabled}
            block
          />
        </Form>
      </Space>
    </Col>
  );
};

export default connect(null, { makeAnnouncement })(AnnouncementModal);

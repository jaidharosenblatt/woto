import TextAreaInput from "../form/TextAreaInput";
import SegmentedControl from "../form/SegmentedControl";
import { Button, Space, Row, Col, Form } from "antd";
import { BellIcon } from "./tools/Icons";
import React, { useState } from "react";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";

const AnnouncementModal = (props) => {
  const [announcement, setAnnouncement] = useState("");
  const [includeURL, setIncludeURL] = useState(false);
  const [meetingURL, setMeetingURL] = useState("");
  const [inputError, setInputError] = useState("");

  const headerThree = `Make an Announcement ${props.course}`;

  const handleSubmit = (announcement, meetingURL) => {
    const isValid = validate(announcement);
    if (isValid) {
      props.onSubmit(announcement, meetingURL);
      props.hideModal();
    }
    setAnnouncement("");
    setInputError("");
  };

  const validate = (announcement) => {
    if (announcement == "") {
      setInputError("You must make an announcement to submit");
      return false;
    }
    return true;
  };

  const renderComponent = (includeURL) => {
    if (includeURL) {
      if (props.meetingURL) {
        return (
          <Col span={24}>
            <TextAreaInput
              required
              autoSize={{ minRows: 1, maxRows: 2 }}
              value={props.meetingURL}
              onChange={(event) => setMeetingURL(event.target.value)}
              type="text"
            />
          </Col>
        );
      } else {
        return (
          <Col span={24}>
            <TextAreaInput
              autoSize={{ minRows: 1, maxRows: 2 }}
              value={meetingURL}
              onChange={(event) => setMeetingURL(event.target.value)}
              type="text"
            />
          </Col>
        );
      }
    }
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
        <Row>
          <Col>
            <Row gutter={[0, 14]}>
              Message
              <TextAreaInput
                required
                autoSize={{ minRows: 5, maxRows: 10 }}
                value={announcement}
                onChange={(event) => setAnnouncement(event.target.value)}
              />
              {inputError ? (
                <div style={{ color: "red" }}>
                  You must make an announcement to submit
                </div>
              ) : null}
            </Row>
            <Row>
              <Col span={12}>
                <p>Include a video URL in my announcement?</p>
              </Col>
              <Col span={12} align="middle">
                <Form>
                  <SegmentedControl
                    name="includeURL"
                    initialValue={false}
                    maxWidth="200px"
                    onChange={(event) => setIncludeURL(event.target.value)}
                    options={[
                      { label: "Yes", value: true },
                      { label: "No", value: false },
                    ]}
                  />
                </Form>
              </Col>
            </Row>
            <Row gutter={[0, 12]}>
              {renderComponent(includeURL)}
              <Col span={24}>
                <Button
                  block
                  type="primary"
                  onClick={async () =>
                    await handleSubmit(announcement, meetingURL)
                  }
                >
                  Send an Announcement to Class!
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

const mapStateToProps = (state) => {
  return {
    meetingURL: selectors.getUserMeetingURL(state),
  };
};

export default connect(mapStateToProps)(AnnouncementModal);

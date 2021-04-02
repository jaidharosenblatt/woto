import React from "react";
import { Form, Input, Tooltip, Col, Row } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ZoomAuthButton from "../user/oauth/ZoomAuthButton";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";

const VideoRoomUrl = ({ meetingURL, required, noDefault }) => {
  // function addhttp(url) {
  //   if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
  //     url = "http://" + url;
  //   }
  //   return url;
  // }

  // const checkValue = ({ target: { value } }) => {
  //   setIValue(addhttp(value));
  //   console.log(ivalue);
  // };

  return (
    <Form.Item
      label={
        <span>
          Video Room URL&nbsp;
          <Tooltip title="Please input a valid link to the virtual meeting room where you would like to meet with others">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      }
      name="meetingURL"
      colon={false}
      initialValue={!noDefault ? meetingURL : undefined}
      // onChange={checkValue}
      rules={[{ required: required, message: "Please include a meeting URL" }]}
    >
      <Row gutter={4}>
        <Col span={18}>
          <Input type="url" placeholder={meetingURL} />
        </Col>
        <Col span={6}>
          <ZoomAuthButton />
        </Col>
      </Row>
    </Form.Item>
  );
};
const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    meetingURL: selectors.getUserMeetingURL(state),
  };
};
export default connect(mapStateToProps)(VideoRoomUrl);

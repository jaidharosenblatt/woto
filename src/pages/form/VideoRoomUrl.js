import React from "react";
import { Form, Input } from "antd";
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
      label="Video Room URL"
      name="meetingURL"
      colon={false}
      initialValue={!noDefault ? meetingURL : undefined}
      // onChange={checkValue}
      rules={[{ required: required, message: "Please include a meeting URL" }]}
    >
      <Input type="url" placeholder="http://zoom.us/j/123456789" />
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

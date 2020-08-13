import React, { useContext } from "react";
import { Form, Input } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

const VideoRoomUrl = ({ required, noDefault }) => {
  const { state } = useContext(AuthContext);
  const meetingURL = state && state.user && state.user.meetingURL;
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

export default VideoRoomUrl;

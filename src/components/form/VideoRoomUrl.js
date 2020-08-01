import React, { useContext } from "react";
import { Form, Input, Space } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

const VideoRoomUrl = ({ required }) => {
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
      label={
        <Space align="center" size={2}>
          <p>Video Room URL</p>
        </Space>
      }
      name="meetingURL"
      colon={false}
      initialValue={meetingURL}
      // onChange={checkValue}
      rules={[{ required: required, message: "Please include a meeting URL" }]}
    >
      <Input type="url" placeholder="http://zoom.us/j/123456789" />
    </Form.Item>
  );
};

export default VideoRoomUrl;

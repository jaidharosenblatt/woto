import React from "react";
import { Form, Input, Space } from "antd";

const VideoRoomUrl = () => {
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
      // onChange={checkValue}
      rules={[{ required: true, message: "Please include a meeting URL" }]}
    >
      <Input type="url" placeholder="http://zoom.us/j/123456789" />
    </Form.Item>
  );
};

export default VideoRoomUrl;

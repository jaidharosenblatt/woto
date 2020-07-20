import React from "react";
import VideoRoomHelper from "../../components/buttons/VideoRoomHelper";
import { Form, Input, Space } from "antd";

const VideoRoomUrl = () => {
  return (
    <Form.Item
      label={
        <Space align="center" size={2}>
          <p>Video Room URL</p> <VideoRoomHelper />
        </Space>
      }
      name="meetingUrl"
      colon={false}
      rules={[{ required: true, message: "Please include a meeting URL" }]}
    >
      <Input placeholder="http://zoom.us/j/123456789" />
    </Form.Item>
  );
};

export default VideoRoomUrl;

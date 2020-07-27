import React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Popup from "../modals/tools/Popup";
import VideoRoomHelperModal from "../modals/VideoRoomHelperModal";

const VideoRoomHelper = () => {
  return (
    <Popup
      modal={VideoRoomHelperModal}
      element={<QuestionCircleOutlined style={{ color: "#585858" }} />}
    />
  );
};

export default VideoRoomHelper;

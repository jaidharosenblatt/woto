import React from "react";
import { Space } from "antd";
import util from "../../util";
import LocationTimeTag from "../course/header/LocationTimeTag";

const QueueInfo = (props) => {
  return (
    <Space direction="vertical">
      <h1>{props.course?.code}'s Office Hours</h1>
      {props.session && (
        <LocationTimeTag
          location={props.session?.location}
          time={`${util.convertTimeString(
            props.session?.startTime
          )} - ${util.convertTimeString(props.session?.endTime)}`}
        />
      )}
    </Space>
  );
};

export default QueueInfo;

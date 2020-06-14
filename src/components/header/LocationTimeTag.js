import React from "react";
import { LocationImage, ClockImage } from "../../static/Images";
import IconTag from "./IconTag";
import { Row, Space } from "antd";

/**
 * @jaidharosenblatt Display a pin with location and clock with time of a session
 * @param {location,time} props the location and time of session to display
 */
const LocationTimeTag = (props) => {
  return (
    <Row>
      <Space>
        <IconTag tag={props.location} image={LocationImage} alt="Pin" />
        <IconTag tag={props.time} image={ClockImage} alt="Clock" />
      </Space>
    </Row>
  );
};

export default LocationTimeTag;

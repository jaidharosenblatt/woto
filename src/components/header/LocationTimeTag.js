import React from "react";
import { LocationImage, ClockImage } from "../../static/Images";
import IconTag from "./IconTag";
import { Row, Space } from "antd";

/**
 * @jaidharosenblatt Display a pin with location and clock with time of a session
 * If either are null then hide
 * @param {location,time} props the location and time of session to display
 */
const LocationTimeTag = (props) => {
  return (
    <Row>
      <Space>
        {props.location !== undefined ? (
          <IconTag tag={props.location} image={LocationImage} alt="Pin" />
        ) : null}
        {props.time !== undefined ? (
          <IconTag tag={props.time} image={ClockImage} alt="Clock" />
        ) : null}
      </Space>
    </Row>
  );
};

export default LocationTimeTag;

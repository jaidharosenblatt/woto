import React from "react";
import { Col } from "antd";

import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import { convertTimeString } from "../../utilfunctions/timeAgo";

/**
 * Render a header for office hours
 * @param {props} courseCode ex CS201
 * @param {props} session active session
 */
const ActiveHeader = (props) => {
  return (
    <Col span={24}>
      <TitleHeader
        title={`${props.courseCode} Office Hours`}
        details={
          props.session && (
            <LocationTimeTag
              location={props.session.location}
              time={`${convertTimeString(
                props.session.startTime
              )} - ${convertTimeString(props.session.endTime)}`}
            />
          )
        }
      />
    </Col>
  );
};

export default ActiveHeader;

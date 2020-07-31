import React from "react";
import { Col } from "antd";

import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import { convertDateString } from "../../utilfunctions/timeAgo";

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
              time={`${convertDateString(
                props.session.startTime
              )} - ${convertDateString(props.session.endTime)}`}
            />
          )
        }
      />
    </Col>
  );
};

export default ActiveHeader;

import React from "react";
import { Col } from "antd";

import TitleHeader from "./TitleHeader";
import LocationTimeTag from "./LocationTimeTag";
import util from "../../../util";

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
              time={`${util.convertTimeString(
                props.session.startTime
              )} - ${util.convertTimeString(props.session.endTime)}`}
            />
          )
        }
      />
    </Col>
  );
};

export default ActiveHeader;

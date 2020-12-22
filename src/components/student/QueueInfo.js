import React from "react";
import { Space } from "antd";
import util from "../../util";
import LocationTimeTag from "../course/header/LocationTimeTag";

const QueueInfo = (props) => {
  const renderComponent = () => {
    if (props.isTA) {
      return (
        <Space direction="vertical">
          <div className="HeaderWrapper">
            <div className="HeaderText">
              <h1>{props.course?.code}'s Office Hours</h1>
              {props.session && (
                <LocationTimeTag
                  location={props.session?.location}
                  time={`${util.convertTimeString(
                    props.session?.startTime
                  )} - ${util.convertTimeString(props.session?.endTime)}`}
                />
              )}
            </div>
          </div>
        </Space>
      );
    } else {
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
    }
  };
  return renderComponent();
};

export default QueueInfo;

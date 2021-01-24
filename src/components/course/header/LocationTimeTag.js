import React from "react";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "./header.css";
import EditSessionButton from "../../modals/buttons/EditSessionButton";

/**
 * @jaidharosenblatt Display a pin with location and clock with time of a session
 * If either are null then hide
 * @param {location,time} props the location and time of session to display
 */
const LocationTimeTag = (props) => {
  return (
    <div className="location-time-tag">
      {props.location && (
        <div>
          <EnvironmentOutlined />
          <h3> {props.location}</h3>
        </div>
      )}
      {props.time && (
        <div>
          <ClockCircleOutlined />
          <h3> {props.time}</h3>
        </div>
      )}

      {props.ta && (
        <h3>
          <EditSessionButton />
        </h3>
      )}
    </div>
  );
};

export default LocationTimeTag;

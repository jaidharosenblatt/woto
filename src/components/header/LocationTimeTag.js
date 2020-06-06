import React from "react";
import { LocationImage, ClockImage } from "../../static/Images";
import IconTag from "./IconTag";

/**
 * @jaidharosenblatt Display a pin with location and clock with time of a session
 * @param {location,time} props the location and time of session to display
 */
const LocationTimeTag = (props) => {
  return (
    <div className="IconTags">
      <IconTag tag={props.location} image={LocationImage} alt="Pin" />
      <IconTag tag={props.time} image={ClockImage} alt="Clock" />
    </div>
  );
};

export default LocationTimeTag;

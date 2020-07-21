import React from "react";
import ProgressiveImage from "./ProgressiveImage";

export const PresentationImage = (props) => {
  return (
    <ProgressiveImage
      alt="presentation"
      className={props.className}
      preview="https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595308212/presentation_full.svg"
      image="https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595308217/presentation_low.svg"
    />
  );
};

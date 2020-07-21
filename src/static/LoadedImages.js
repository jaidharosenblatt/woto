import React from "react";
import ProgressiveImage from "./ProgressiveImage";

export const PresentationImage = (props) => {
  return (
    <ProgressiveImage
      alt="presentation"
      className={props.className}
      preview="https://res.cloudinary.com/dwgqvt5ng/image/upload/c_scale,w_10/v1595308212/presentation.svg"
      image="https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595308212/presentation.svg"
    />
  );
};

export const SplashHeaderImage = (props) => {
  return (
    <ProgressiveImage
      alt="presentation"
      className={props.className}
      preview="https://res.cloudinary.com/dwgqvt5ng/image/upload/c_scale,w_10/v1595308730/splashheader.svg"
      image="https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595308730/splashheader.svg"
    />
  );
};

export const TalkingImage = (props) => {
  return (
    <ProgressiveImage
      alt="presentation"
      className={props.className}
      preview="https://res.cloudinary.com/dwgqvt5ng/image/upload/c_scale,w_10/v1595309008/talking.svg"
      image="https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595309008/talking.svg"
    />
  );
};

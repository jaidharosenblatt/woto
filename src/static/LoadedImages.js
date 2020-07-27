import React from "react";
import ProgressiveImage from "./ProgressiveImage";
/**
 * Load a blurred low res image (preview) and then the full image
 * @param {props} className pass down the styles for the image
 */

export const PresentationImage = (props) => {
  return (
    <ProgressiveImage
      alt="presentation"
      className={props.className}
      image="https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595308212/presentation.svg"
    />
  );
};

export const SplashHeaderImage = (props) => {
  return (
    <ProgressiveImage
      alt="hero"
      className={props.className}
      image="https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595308730/splashheader.svg"
    />
  );
};

export const TalkingImage = (props) => {
  return (
    <ProgressiveImage
      alt="talking"
      className={props.className}
      image="https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595309008/talking.svg"
    />
  );
};

export const GlobeImage = (props) => {
  return (
    <ProgressiveImage
      alt="globe"
      className={props.className}
      image="https://res.cloudinary.com/dwgqvt5ng/image/upload/v1594420324/emails/email_uudyev.svg"
    />
  );
};

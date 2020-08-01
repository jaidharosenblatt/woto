import React from "react";
import ProgressiveImage from "./ProgressiveImage";
/**
 * Load a blurred low res image (preview) and then the full image
 * @param {props} className pass down the styles for the image
 */

//convert image to low res in cloudinary
const getLowRes = (image) => {
  const split = image.split("/upload");
  return split[0] + "/upload/c_scale,w_10" + split[1];
};

export const PresentationImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595308212/presentation.svg";

  return (
    <ProgressiveImage
      alt="presentation"
      className={props.className}
      preview={getLowRes(image)}
      image={image}
    />
  );
};

export const SplashHeaderImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595308730/splashheader.svg";
  return (
    <ProgressiveImage
      alt="hero"
      className={props.className}
      preview={getLowRes(image)}
      image={image}
    />
  );
};

export const TalkingImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595309008/talking.svg";
  return (
    <ProgressiveImage
      alt="talking"
      className={props.className}
      preview={getLowRes(image)}
      image={image}
    />
  );
};

export const GlobeImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1594420324/emails/email_uudyev.svg";
  return (
    <ProgressiveImage
      alt="globe"
      className={props.className}
      preview={getLowRes(image)}
      image={image}
    />
  );
};

export const EmailImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1596054241/sent_messages__mu6xau.svg";
  return (
    <ProgressiveImage
      alt="email"
      preview={getLowRes(image)}
      image={image}
      className={props.className}
      image=""
    />
  );
};

export const PageNotFoundImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1596054309/404_b2cyqb.svg";
  return (
    <ProgressiveImage
      alt="404 Error"
      className={props.className}
      preview={getLowRes(image)}
      image={image}
    />
  );
};

export const AdjustableQuestionScreenshotImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1596320306/Group_1_2_fvt0gf.png";
  return (
    <ProgressiveImage
      alt="Sceen shot"
      className={props.className}
      preview={getLowRes(image)}
      image={image}
    />
  );
};

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
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const SplashHeaderImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595308730/splashheader.svg";
  return (
    <ProgressiveImage
      alt="hero"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const TalkingImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1595309008/talking.svg";
  return (
    <ProgressiveImage
      alt="talking"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const GlobeImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1594420324/emails/email_uudyev.svg";
  return (
    <ProgressiveImage
      alt="globe"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
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
      className={props.className ? props.className : ""}
    />
  );
};

export const PageNotFoundImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1596054309/404_b2cyqb.svg";
  return (
    <ProgressiveImage
      alt="404 Error"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const AdjustableQuestionScreenshotImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1596320306/Group_1_2_fvt0gf.png";
  return (
    <ProgressiveImage
      alt="Sceen shot"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const ChecklistImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1597531489/checklist_qlrk7h.svg";
  return (
    <ProgressiveImage
      alt="Checklist"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const ChecklistPencilImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1597531863/checklist__eflbh9.svg";
  return (
    <ProgressiveImage
      alt="Checklist"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const RocketImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1597543386/fast_working_ahkgsl.svg";
  return (
    <ProgressiveImage
      alt="Rocket"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const WaitingImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607064304/notifications_1_okbky5.svg";
  return (
    <ProgressiveImage
      alt="waiting"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

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

export const LogoWhite = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607238543/LogoWhite_hna1f8.svg";
  return (
    <ProgressiveImage
      alt="woto"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const Logo = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607238542/Logo_i3vpwj.svg";
  return (
    <ProgressiveImage
      alt="woto"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
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

export const AchievementImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607236302/achievement_hfhyun.svg";
  return (
    <ProgressiveImage
      alt="success"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const BugImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607236479/bug_as4bmj.svg";
  return (
    <ProgressiveImage
      alt="bug"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const SchoolImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607236546/school_eigjwa.svg";
  return (
    <ProgressiveImage
      alt="school"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const JaidhaImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607237540/people/headshot_epkaks.jpg";
  return (
    <ProgressiveImage
      alt="jaidha"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const YasaImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607237455/people/yasa_eksydi.jpg";
  return (
    <ProgressiveImage
      alt="yasa"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const DanielImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607237442/people/daniel_jqsvct.jpg";
  return (
    <ProgressiveImage
      alt="daniel"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const TommyImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607237442/people/tommy_wc11io.jpg";
  return (
    <ProgressiveImage
      alt="tommy"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const NoahImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607237442/people/noah_nhjnqr.jpg";
  return (
    <ProgressiveImage
      alt="noah"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const MatthewImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607237442/people/matthew_ftcusc.jpg";
  return (
    <ProgressiveImage
      alt="matthew"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const HourglassImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607298299/hourglass_pz5ona.svg";
  return (
    <ProgressiveImage
      alt="hourglass"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const SplashWotoImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607501780/product%20screenshots/woto_uwbwxr.png";
  return (
    <ProgressiveImage
      alt="woto rooms"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const SplashStudentImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607501783/product%20screenshots/student_dkoale.png";
  return (
    <ProgressiveImage
      alt="student queue"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const SplashInstructorImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607500003/product%20screenshots/instructor_rkzc6v.png";
  return (
    <ProgressiveImage
      alt="instructor dashboard"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

export const SplashTAImage = (props) => {
  const image =
    "https://res.cloudinary.com/dwgqvt5ng/image/upload/v1607500005/product%20screenshots/ta2_wpyumu.png";
  return (
    <ProgressiveImage
      alt="ta"
      preview={getLowRes(image)}
      image={image}
      className={props.className ? props.className : ""}
    />
  );
};

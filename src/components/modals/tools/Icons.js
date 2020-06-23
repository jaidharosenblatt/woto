import React from "react";
import { Bell, BlueQuestionMark, GrayQuestionMark, BluePencil, GrayClipboard, GrayLines, GrayPage } from "../../../static/Images";
import { Video } from "../../../static/Images";

export const BellIcon = () => {
  return <img style={{ width: 40 }} src={Bell} alt="active" />;
};

export const VideoIcon = () => {
  return <img style={{ width: 40 }} src={Video} alt="active" />;
};

export const BlueQuestionMarkIcon = () => {
  return <img style={{ width: 40 }} src={BlueQuestionMark} alt="active" />;
};

export const GrayQuestionMarkIcon = () => {
  return <img style={{ width: 30 }} src={GrayQuestionMark} alt="active" />;
};

export const BluePencilIcon = () => {
  return <img style={{ width: 30 }} src={BluePencil} alt="active" />;
};

export const GrayClipboardIcon = () => {
  return <img style={{ width: 30 }} src={GrayClipboard} alt="active" />;
};

export const GrayLinesIcon = () => {
  return <img style={{ width: 30 }} src={GrayLines} alt="active" />;
};

export const GrayPageIcon = () => {
  return <img style={{ width: 30 }} src={GrayPage} alt="active" />;
};
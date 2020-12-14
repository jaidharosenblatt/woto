import React from "react";

import { modalTypes } from "./modalTypes";
/**
 * Use a key from modalTypes to render the desired modal
 * @param {String} type
 */
const ModalFactory = ({ type }) => {
  switch (type) {
    case modalTypes.HELP_READY:
      return <div>Help Ready!</div>;
    default:
      return null;
  }
};

export default ModalFactory;

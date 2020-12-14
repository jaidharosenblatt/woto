import React from "react";
import TurnHelpModal from "../TurnHelpModal";

import { modalTypes } from "./modalTypes";
/**
 * Use a key from modalTypes to render the desired modal
 * @param {String} type
 */
const ModalFactory = ({ type }) => {
  switch (type) {
    case modalTypes.HELP_READY:
      return <TurnHelpModal />;
    default:
      return null;
  }
};

export default ModalFactory;

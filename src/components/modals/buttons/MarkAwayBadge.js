import React from "react";
import Popup from "../tools/Popup";
import MarkAwayModal from "../MarkAwayModal.js.js";
import { CloseOutlined } from "@ant-design/icons";
import "./buttons.css";

/**
 *
 * @param {props} markAway
 * @param {props} name
 */
const MarkAwayBadge = (props) => {
  return (
    <Popup
      element={
        <div className="mark-away">
          <CloseOutlined />
        </div>
      }
      {...props}
      modal={MarkAwayModal}
    />
  );
};

export default MarkAwayBadge;

import React from "react";
import Popup from "../modals/tools/Popup";
import MarkAwayModal from "../modals/MarkAwayModal.js";
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

import { Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import { resetRosterStatus } from "../../../../redux/status/actionCreators";
import Popup from "../../../modals/tools/Popup";
import CSVUploadModal from "./CSVUploadModal";

const CSVUploadButtonText = (props) => {
  return (
    <Popup
      element={
        props.isButton ? (
          <Button onClick={props.resetRosterStatus}>
            Upload Roster from CSV
          </Button>
        ) : (
          <p>
            or{" "}
            <span onClick={props.resetRosterStatus} className="fake-link">
              {" "}
              upload{" "}
            </span>
            from a CSV.
          </p>
        )
      }
      modal={CSVUploadModal}
    />
  );
};
export default connect(null, { resetRosterStatus })(CSVUploadButtonText);

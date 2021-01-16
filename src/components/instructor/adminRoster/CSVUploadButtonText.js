import { Button } from "antd";
import React from "react";
import Popup from "../../modals/tools/Popup";
import CSVUploadModal from "./CSVUploadModal";

export default function CSVUploadButtonText({ isButton }) {
  return (
    <Popup
      element={
        isButton ? (
          <Button>Upload Roster from CSV</Button>
        ) : (
          <p>
            or <span className="fake-link"> upload </span>from a CSV.
          </p>
        )
      }
      modal={CSVUploadModal}
    />
  );
}

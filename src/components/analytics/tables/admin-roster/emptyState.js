import React from "react";

import {
  ChecklistImage,
  ChecklistPencilImage,
} from "../../../../static/LoadedImages";

import "../tables.css";

// Empty state for the collab table
const EmptyState = ({ type }) => {
  return (
    <div className="empty-table">
      {type === "student" ? (
        <>
          <p>Add students to your course</p>
          <ChecklistPencilImage className="empty-image" />
        </>
      ) : (
        <>
          <p>
            Add your first teaching assistant by promoting one of the students
            above
          </p>
          <ChecklistImage className="empty-image" />
        </>
      )}
    </div>
  );
};

export default EmptyState;

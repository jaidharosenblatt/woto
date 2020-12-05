import React from "react";

import { RocketImage } from "../../../../static/LoadedImages";

// Empty state for the collab table
const HelpEmptyState = () => {
  return (
    <div className="empty-collab-table">
      <p>Great job! No students currently in the queue</p>
      <RocketImage className="waiting-image" />
    </div>
  );
};
export default HelpEmptyState;

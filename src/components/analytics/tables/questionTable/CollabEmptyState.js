import React from "react";

import { GlobeImage } from "../../../../static/LoadedImages";

// Empty state for the collab table
const CollabEmptyState = () => {
  return (
    <div className="empty-collab-table">
      <p>No one here. Be the first to create a Woto Room</p>
      <GlobeImage className="waiting-image" />
    </div>
  );
};
export default CollabEmptyState;

import React from "react";
import { ChecklistImage } from "../../static/LoadedImages";

const EmptyState = ({ message }) => {
    return (
        <div className="empty-table">
            <ChecklistImage className="empty-image" />
            <p>{message}</p>
        </div>
    );
};

export default EmptyState;
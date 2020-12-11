import React from "react";
import { Row, Col } from "antd";

import "./TeachingStaff.css";
import Staffer from "./Staffer";

/**
 * Render a staffers array into a row with N cols
 * @param {Array} staffers from a session
 * @param {Integer} numCols number of columns in desired row
 */
const TeachingStaffRow = ({ staffers, numCols = 4 } = {}) => {
  if (!staffers || staffers[0] == null) {
    return null;
  }

  // Initialize numCols
  let cols = [];
  for (let i = 0; i < numCols; i++) {
    cols.push([]);
  }
  // Split into numCols
  staffers.forEach((staffer, i) => {
    const jsx = <Staffer key={i} staffer={staffer} i={i} />;
    cols[i % numCols].push(jsx);
  });

  return (
    <Row className="teaching-staff-row">
      {cols.map((col, i) => {
        if (col.length === 0) return null;
        return (
          <Col xs={24} md={24 / numCols} key={i}>
            {col}
          </Col>
        );
      })}
    </Row>
  );
};

export default TeachingStaffRow;

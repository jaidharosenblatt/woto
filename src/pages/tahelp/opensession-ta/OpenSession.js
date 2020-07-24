import React from "react";
import { Row } from "antd";
import { Hourglass } from "../../../static/Images";

import OpenSessionForm from "./OpenSessionForm";
import "./OpenSession.css";

/**
 * @MatthewSclar Page for TAs to open a session.
 *Uses:OpenSessionForm
 */

const OpenSession = ({ course, openSession, joinSession }) => {
  return (
    <div className="OpenSessionFormWrapper">
      <Row align="center">
        <img src={Hourglass} alt="Hourglass" />
      </Row>

      <Row align="center">
        <OpenSessionForm
          OpenSession={openSession}
          joinSession={joinSession}
          course={course}
          activesession={course.activeSession}
        />
      </Row>
    </div>
  );
};

export default OpenSession;

import React from "react";
import { Row } from "antd";
import { Hourglass } from "../../../static/Images";

import OpenSessionForm from "./OpenSessionForm";
import JoinSessionForm from "./JoinSessionForm";

import "./OpenSession.css";

/**
 * @MatthewSclar Page for TAs to open a session.
 *Uses:OpenSessionForm
 */

const OpenSession = ({ course, openSession, joinSession, session }) => {
  return (
    <div className="OpenSessionFormWrapper">
      <Row align="center" gutter={[0, 20]}>
        <img src={Hourglass} alt="Hourglass" />
      </Row>

      <Row align="center">
        {course.activeSession ? (
          <JoinSessionForm
            session={session}
            onSubmit={joinSession}
            course={course}
          />
        ) : (
          <OpenSessionForm onSubmit={openSession} course={course} />
        )}
      </Row>
    </div>
  );
};

export default OpenSession;

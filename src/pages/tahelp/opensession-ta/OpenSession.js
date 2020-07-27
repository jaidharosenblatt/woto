import React from "react";
import OpenSessionForm from "./OpenSessionForm";
import JoinSessionForm from "./JoinSessionForm";

import "./OpenSession.css";

/**
 * @MatthewSclar Page for TAs to open a session.
 *Uses:OpenSessionForm
 */

const OpenSession = ({ course, openSession, joinSession, session }) => {
  return (
    <div className="ta-session-wrapper">
      <div className="ta-session-content">
        {course.activeSession ? (
          <JoinSessionForm
            session={session}
            onSubmit={joinSession}
            course={course}
          />
        ) : (
          <OpenSessionForm onSubmit={openSession} course={course} />
        )}
      </div>
    </div>
  );
};

export default OpenSession;

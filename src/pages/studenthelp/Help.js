import React, { useState, useContext } from "react";
import { Row, Col } from "antd";

import InactiveSessionCard from "./InactiveSessionCard";
import Announcement from "../../components/announcement/Announcement";
import JoinQueue from "./JoinQueue";
import Waiting from "./Waiting";
import BeingHelped from "./BeingHelped";
import SubmitQuestion from "./SubmitQuestion";
import ActiveHeader from "./ActiveHeader";
import { HelpContextProvider, HelpContext } from "../../contexts/HelpContext";

/**
 * @jaidharosenblatt Page for students to recieve help for a given course
 */
const Help = ({ course }) => {
  const [status, setStatus] = useState(course.active ? "" : "inactive");
  const [announcements, setAnnouncements] = useState([
    "There is a mistake in #1",
    "My session ends in 10 minutes",
  ]);
  const question = { hello: "a" };

  const headerAnnouncements = (
    <>
      <ActiveHeader courseName={course.name} />
      <Row align="center">
        <Col span={24}>
          {announcements.map((announcement, key) => {
            return <Announcement key={key} message={announcement} />;
          })}
        </Col>
      </Row>
    </>
  );

  const context = useContext(HelpContext);
  var page = null;
  switch (context.stage) {
    case "preQuestion":
      page = (
        <SubmitQuestion
          courseName={course.name}
          submitQuestion={() => setStatus("questionSubmitted")}
        />
      );
      break;
    case "questionSubmitted":
      page = <Waiting question={question} />;
      break;
    case "helped":
      page = <BeingHelped question={question} />;
      break;
    default:
      page = (
        <JoinQueue
          courseName={course.name}
          queueSize={2}
          handleJoin={() => setStatus("preQuestion")}
        />
      );
      break;
  }
  return (
    <div className="HelpWrapper">
      <HelpContextProvider>
        {course.active ? (
          <>
            {context.status === "" && headerAnnouncements}
            {page}
          </>
        ) : (
          <InactiveSessionCard courseName={course.name} />
        )}
      </HelpContextProvider>
    </div>
  );
};

export default Help;

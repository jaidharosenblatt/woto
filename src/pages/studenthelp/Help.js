import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import Announcement from "../../components/announcement/Announcement";
import JoinQueue from "./JoinQueue";
import WotoRoom from "./WotoRoom";
import BeingHelped from "./BeingHelped";
import SubmitQuestion from "./SubmitQuestion";
import ActiveHeader from "../../components/header/ActiveHeader";

/**
 * @jaidharosenblatt Page for students to recieve help for a given course
 */
const Help = ({ course }) => {
  const [stage, setStage] = useState();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    setAnnouncements([
      "There is a mistake in #1",
      "My session ends in 10 minutes",
    ]);
  }, []);

  var page = null;
  switch (stage) {
    case "submit":
      page = <SubmitQuestion setStage={setStage} />;
      break;
    case "collab":
      page = <WotoRoom courseName={course.name} setStage={setStage} active />;
      break;
    case "helped":
      page = <BeingHelped />;
      break;
    default:
      page = <JoinQueue setStage={setStage} courseName={course.name} />;
      break;
  }

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

  return (
    <div className="HelpWrapper">
      {course.active ? (
        <>
          {(stage === "submit" || stage === "helped") && headerAnnouncements}
          {page}
        </>
      ) : (
        <WotoRoom courseName={course.name} />
      )}
    </div>
  );
};

export default Help;

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
  const [question, setQuestion] = useState();
  const [stage, setStage] = useState();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    setAnnouncements([
      "There is a mistake in #1",
      "My session ends in 10 minutes",
    ]);
  }, []);

  var page = null;

  const pageProps = {
    question,
    courseName: course.code,
    setQuestion,
    setStage,
  };

  switch (stage) {
    case "submit":
      page = <SubmitQuestion {...pageProps} />;
      break;
    case "collab":
      page = <WotoRoom {...pageProps} active />;
      break;
    case "helped":
      page = <BeingHelped />;
      break;
    default:
      page = <JoinQueue setStage={setStage} courseName={course.code} />;
      break;
  }

  const headerAnnouncements = (
    <>
      <ActiveHeader courseName={course.code} />
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
      {course.activeSession ? (
        <>
          {(stage === "submit" || stage === "helped") && headerAnnouncements}
          {page}
        </>
      ) : (
        <WotoRoom {...pageProps} />
      )}
    </div>
  );
};

export default Help;

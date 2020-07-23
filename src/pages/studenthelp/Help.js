import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import API from "../../api/API";
import Announcement from "../../components/announcement/Announcement";
import JoinQueue from "./JoinQueue";
import WotoRoom from "./WotoRoom";
import BeingHelped from "./BeingHelped";
import SubmitQuestion from "./SubmitQuestion";
import ActiveHeader from "../../components/header/ActiveHeader";

/**
 * @jaidharosenblatt Wrapper page for the student help process for both Woto rooms
 * and for submitting a question for a TA queue. Uses state variables to hold the current
 * stage of the problem and passes down as props to all of the pages. Decided to use
 * hooks instead of context for readability
 *
 * @param {course} code course code to display on various help pages
 * @param {course} activeSession the key of the active session if it exists
 */
const Help = ({ course }) => {
  // const [question, setQuestion] = useState({
  //   assignment: ["Assignment 1"],
  //   stage: "Getting Started",
  //   concepts: ["Array"],
  //   meetingUrl: "https://duke.zoom.us/j/123456789",
  //   details: "Really struggling here",
  // });
  const [question, setQuestion] = useState();
  const [stage, setStage] = useState();
  const [discussion, setDiscussion] = useState();

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    setAnnouncements([
      "There is a mistake in #1",
      "My session ends in 10 minutes",
    ]);
  }, []);

  const askQuestion = async (values) => {
    console.log(values);
    var description = {
      description: {
        assignment: values.assignment,
        stage: values.stage,
        concepts: values.concepts,
        zoomlink: values.meetingUrl,
        details: values.details,
        size: "1",
      },
    };
    console.log(description);
    try {
      const response = await API.askWotoQuestion(course._id, description);
      setDiscussion(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setQuestion(values);
  };

  var page = null;

  const pageProps = {
    question,
    course,
    setQuestion,
    setStage,
  };

  switch (stage) {
    case "submit":
      page = <SubmitQuestion {...pageProps} />;
      break;
    case "collab":
      page = (
        <WotoRoom
          discussion={discussion}
          askQuestion={askQuestion}
          {...pageProps}
          active
        />
      );
      break;
    case "helped":
      page = <BeingHelped />;
      break;
    default:
      page = <JoinQueue setStage={setStage} course={course} />;
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
        <WotoRoom askQuestion={askQuestion} {...pageProps} />
      )}
    </div>
  );
};

export default Help;

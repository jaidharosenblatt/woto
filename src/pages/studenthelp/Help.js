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
  //   stage: "Just started the problem",
  //   concepts: ["Array"],
  //   meetingUrl: "https://duke.zoom.us/j/123456789",
  //   details: "Really struggling here",
  // });
  const [question, setQuestion] = useState();
  const [stage, setStage] = useState();
  const [session, setSession] = useState([]);

  useEffect(() => {
    async function getSession() {
      const res = await API.getSession(course._id);
      setSession(res);
      console.log(res);
    }
    if (course.activeSession) {
      getSession();
    }
  }, [course]);

  const askQuestion = async (values) => {
    const description = { ...values };
    console.log(description);
    try {
      const response = await API.askWotoQuestion(course._id, description);
      setQuestion(values);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  var page = null;

  const pageProps = {
    question,
    course,
    session,
    setQuestion,
    setStage,
  };

  switch (stage) {
    case "submit":
      page = <SubmitQuestion {...pageProps} />;
      break;
    case "collab":
      page = <WotoRoom askQuestion={askQuestion} {...pageProps} active />;
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
          {session.announcements &&
            session.announcements.map((announcement, key) => {
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

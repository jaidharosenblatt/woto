import { Row, Col, Button } from "antd";
import React from "react";
import {
  SplashHeaderImage,
  SplashStudentImage,
  SplashTAImage,
  SplashWotoImage,
  SplashInstructorImage,
  TalkingImage,
} from "../../static/LoadedImages";

import { Link } from "react-router-dom";
import ImageTitle from "./ImageTitle";
import "./SplashPage.css";

const SplashPage = () => {
  window.scrollTo(0, 0);

  return (
    <div className="Splash">
      <Row align="center" style={{ backgroundColor: "#40A9FF" }}>
        <div className="header-wrapper">
          <Col align="left" xs={24} md={10}>
            <div className="headerText">
              <h1 className="header-title">
                <b className="emphasize">Working together</b> to make course
                office hours more efficient
              </h1>
              <Link to="/signup">
                <Button size="large">Get Started!</Button>
              </Link>
            </div>
          </Col>
          <Col align="center" xs={0} md={14}>
            <SplashHeaderImage className="headerImage" />
          </Col>
        </div>
      </Row>
      <div className="body-wrapper">
        <ImageTitle
          title="Analyze Your Courses"
          body="Conveniently get insights into the performance of teaching assistants, the types
              of questions students are asking, and detailed feedback for
              specific office hour sessions."
          image={<SplashInstructorImage className="bodyImage" />}
        />
        <ImageTitle
          right
          title="Real Time Insights"
          body="Teaching assistants can use analytics about the current session to group up students with similar questions.
          Less duplicated questions means shorter wait times and happier teaching assistants"
          image={<SplashTAImage className="bodyImage" />}
        />

        <ImageTitle
          title="Keep Office Hours Transparent"
          body="Woto keeps students in the know about their queue position and
          expected wait time for help, allowing them to work office hours
          into their schedule, even during long queue times."
          image={<SplashStudentImage className="bodyImage" />}
        />

        <ImageTitle
          right
          title="Facilitate Peer Collaboration"
          body="For any environment, online or virtual, students can create Woto Rooms where they can connect in smaller groups to solve problems during and outside of office hours."
          image={<SplashWotoImage className="bodyImage" />}
        />
      </div>
    </div>
  );
};

export default SplashPage;

import { Row, Col, Button } from "antd";
import React from "react";
import {
  SplashHeaderImage,
  PresentationImage,
  TalkingImage,
} from "../../static/LoadedImages";

import { Link } from "react-router-dom";
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
                <b className="emphasize">Working Together</b> to make office
                hours more efficient
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
        <Row align="middle">
          <Col xs={24} md={12} align="center">
            <PresentationImage className="bodyImage" />
          </Col>
          <Col xs={24} md={12}>
            <h1 className="body-title">Built for Instructors</h1>
            <h2>Get Data about How Students Learn</h2>
            <p>
              Conveniently get insights about the performance of TAs, the types
              of questions students are asking, and detailed feedback for
              specific office hour sessions.
            </p>
            <h2>Facilitate Group Learning </h2>
            <p>
              For any environment, online or virtual, professors can set up a
              "Woto Room” where students can connect in smaller zoom groups and
              problem solve, during and outside of office hours.
            </p>
            <h2>Administrate Office Hours Effectively</h2>
            <p>
              Woto’s historical data tracking tools allow instructors to
              effortlessly distribute teaching assistants to reduce wait times
              at overcrowded office hours sessions.
            </p>
          </Col>
        </Row>
        <Row align="middle" gutter={48}>
          <Col xs={24} md={0} align="center">
            <TalkingImage className="bodyImage" />
          </Col>
          <Col xs={24} md={12}>
            <h1 className="body-title">Designed For Students</h1>
            <h2>Manage Your Time with Transparent Office Hours</h2>
            <p>
              Woto keeps students in the know about their queue position and
              expected wait time for help, allowing them to work office hours
              into their schedule, even during long queue times.
            </p>
            <h2>Collaborate with Your Peers</h2>
            <p>
              Students can collaborate with one another on coursework from the
              comfort of their homes.
            </p>
            <h2>Easy for Teaching Assistants</h2>
            <p>
              With the option for students to group up and work collaboratively
              in office hours, teaching assistants can address many students
              facing the same issue at once instead of having to repeat
              themselves, saving everyone time.
            </p>
          </Col>
          <Col xs={0} md={12} align="center">
            <TalkingImage className="bodyImage" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SplashPage;

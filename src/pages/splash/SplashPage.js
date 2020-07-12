import { Row, Col, Button } from "antd";
import React from "react";
import {
  Encourage,
  Homies,
  Tablet,
  Built,
  ProblemImage,
  PresentationImage,
  WaitingImage,
} from "../../static/Images";
import { Link } from "react-router-dom";
import "./SplashPage.css";

const SplashPage = () => {
  return (
    <div className="Splash">
      <Row align="center" style={{ backgroundColor: "#40A9FF" }}>
        <div className="header-wrapper">
          <Col align="left" xs={24} sm={10}>
            <div className="headerText">
              <h1 className="header-title">
                <b className="emphasize">Working Together</b> to make office
                hours more efficient
              </h1>
              <Link to="/signup">
                <Button>Get Started </Button>
              </Link>
            </div>
          </Col>
          <Col align="center" xs={0} sm={14}>
            <img className="headerImage" alt="people" src={Homies} />
          </Col>
        </div>
      </Row>
      <div className="body-wrapper">
        <Col align="center">
          <h1 className="body-title">Built for Instructors</h1>
        </Col>
        <Row align="middle" gutter={48}>
          <Col span={8} align="center">
            <img className="bodyImage" alt="tablet" src={Tablet} />
          </Col>
          <Col span={8} align="center">
            <img className="bodyImage" alt="online" src={Encourage} />
          </Col>
          <Col span={8} align="center">
            <img className="bodyImage" alt="encourage" src={Built} />
          </Col>
        </Row>
        <Row align="middle" gutter={48}>
          <Col span={8}>
            <h2>Get Behind-the-scenes Data about How Students Learn</h2>
            <p>
              Conveniently get insights about the performance of TAs, the types
              of questions students are asking, and detailed feedback for
              specific office hour sessions.
            </p>
          </Col>
          <Col span={8}>
            <h2>Facilitate Group Learning </h2>
            <p>
              For any environment, online or virtual, professors can set up a
              "Woto Room” where students can connect in smaller zoom groups and
              problem solve, during and outside of office hours.
            </p>
          </Col>
          <Col span={8}>
            <h2>Administrate Office Hours Effectively</h2>
            <p>
              Woto’s historical data tracking tools allow instructors to
              effortlessly distribute teaching assistants to reduce wait times
              at overcrowded office hours sessions.
            </p>
          </Col>
        </Row>
        <Col align="center">
          <h1 className="body-title">Designed For Students</h1>
        </Col>
        <Row align="middle" gutter={48}>
          <Col span={8} align="center">
            <img className="bodyImage" alt="tablet" src={WaitingImage} />
          </Col>
          <Col span={8} align="center">
            <img className="bodyImage" alt="online" src={ProblemImage} />
          </Col>
          <Col span={8} align="center">
            <img
              className="bodyImage"
              alt="encourage"
              src={PresentationImage}
            />
          </Col>
        </Row>
        <Row align="middle" gutter={48}>
          <Col span={8}>
            <h2>Manage Your Time with Transparent Office Hours</h2>
            <p>
              Woto keeps students in the know about their queue position and
              expected wait time for help, allowing them to work office hours
              into their schedule, even during long queue times.
            </p>
          </Col>
          <Col span={8}>
            <h2>Collaborate with Your Peers</h2>
            <p>
              For any environment, online or virtual, professors can set up a
              "Woto Room” where students can connect in smaller zoom groups and
              problem solve, during and outside of office hours.
            </p>
          </Col>
          <Col span={8}>
            <h2>Simplify Teaching Assistants</h2>
            <p>
              With the option for students to group up and work collaboratively
              in office hours, teaching assistants can address many students
              facing the same issue at once instead of having to repeat
              themselves, saving everyone time.
            </p>
          </Col>
        </Row>
      </div>
      <div className="mobile">
        <img className="bodyImage" alt="encourage" src={WaitingImage} />
        <h1>Encourage group learning</h1>
        <p>
          Allow students to <b> work together </b>while they wait for help from
          teaching assistants.
        </p>
        <img className="bodyImage" alt="online" src={Built} />
        <h1>Built for online</h1>
        <p>
          Keep students in the know by informing them of their queue position
          and expected wait time.
        </p>
        <img className="bodyImage" alt="encourage" src={PresentationImage} />
        <h1>Simplify Teaching Assistants’ Jobs</h1>
        <p>
          With the option for students to group up and work collaboratively in
          office hours, teaching assistants can address many students facing the
          same issue at once instead of having to repeat themselves, saving
          everyone time.
        </p>
      </div>
    </div>
  );
};

export default SplashPage;

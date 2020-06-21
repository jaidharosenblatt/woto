import { Row, Col, Button } from "antd";
import React from "react";
import { Encourage, Homies, Tablet, Built } from "../../static/Images";
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
              <Link to="/cs330">
                <Button>Get Started</Button>
              </Link>
            </div>
          </Col>
          <Col align="right" xs={0} sm={14}>
            <img className="headerImage" alt="people" src={Homies} />
          </Col>
        </div>
      </Row>
      <div className="body-wrapper">
        <Row align="middle">
          <Col span={11} align="left">
            <img className="bodyImage" alt="tablet" src={Tablet} />
          </Col>
          <Col span={13} align="left">
            <h1>Get behind-the-scenes data about how students learn</h1>
            <p>
              Conveniently get insights about the performance of TAs, the types
              of questions students are asking, and detailed feedback for
              specific office hour sessions.
            </p>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={13} align="left">
            <h1>Built for online</h1>
            <p>
              Keep students in the know by informing them of their queue
              position and expected wait time.
            </p>
          </Col>
          <Col span={11} align="right">
            <img className="bodyImage" alt="online" src={Built} />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={11} align="left">
            <img className="bodyImage" alt="encourage" src={Encourage} />
          </Col>
          <Col span={13} align="left">
            <h1>Encourage group learning</h1>
            <p>
              Allow students to <b> work together </b>while they wait for help
              from teaching assistants.
            </p>
          </Col>
        </Row>
      </div>
      <div className="mobile">
        <img className="bodyImage" alt="encourage" src={Encourage} />
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
        <img className="bodyImage" alt="encourage" src={Encourage} />
        <h1>Encourage group learning</h1>
        <p>
          Allow students to <b> work together </b>while they wait for help from
          teaching assistants.
        </p>
      </div>
    </div>
  );
};

export default SplashPage;

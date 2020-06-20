import { Row, Col, Button } from "antd";
import React from "react";
import { Encourage, Homies, Tablet, Built } from "../../static/Images";
import { Link } from "react-router-dom";
import "./SplashPage.css";

const SplashPage = () => {
  return (
    <div className="Splash">
      <Row align="center" style={{ backgroundColor: "#40A9FF" }}>
        <div className="content">
          <Col align="left" xs={24} md={10}>
            <div className="headerText">
              <h1>
                <b className="emphasize">Working together</b> to make office
                hours more efficient for everyone
              </h1>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </Col>
          <Col align="right" xs={0} md={14}>
            <img className="headerImage" alt="people" src={Homies} />
          </Col>
        </div>
      </Row>

      <Row align="middle">
        <Col span={6} offset={3}>
          <img className="tab" alt="tablet" src={Tablet} />
        </Col>
        <Col span={6} offset={6}>
          Get behind-the-scenes data about how students learn
        </Col>
      </Row>
      <Row align="middle">
        <Col span={6} offset={6}>
          Built for online
        </Col>
        <Col span={6} offset={-6}>
          <img className="built" alt="video call" src={Built} />
        </Col>
      </Row>

      <Row align="middle">
        <Col span={6} offset={3}>
          <img className="encourage" alt="collaboration" src={Encourage} />
        </Col>
        <Col span={6} offset={6}>
          Encourage group learning
        </Col>
      </Row>
    </div>
  );
};

export default SplashPage;

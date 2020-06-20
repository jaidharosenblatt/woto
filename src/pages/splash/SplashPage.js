import { Row, Col, Button, Typography } from "antd";
import React from "react";
import {
  Encourage,
  Homies,
  Tablet,
  Built,
  LogoWhite,
} from "../../static/Images";
import { Link } from "react-router-dom";

const SplashPage = () => {
  return (
    <div>
      <Row justify="center" style={{ backgroundColor: "#40A9FF" }}>
        <Col span={6}>
          <Row>
            <img className="logo" alt="logo" src={LogoWhite} />
          </Row>
          <Row>
            <Typography strong>Working Together</Typography>
          </Row>
          <Row>
            <Link to="/signup">
              <Button size={5}>Sign Up</Button>
            </Link>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <img className="dudes" alt="people" src={Homies} />
          </Row>
        </Col>
        <Col span={6}>
          <Link to="/signin">
            <Button type="primary" size={5} shape="round">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button size={5} shape="round">
              Sign Up
            </Button>
          </Link>
        </Col>
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

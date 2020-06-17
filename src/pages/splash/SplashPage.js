import { Row, Col, Button } from 'antd';
import React from "react";
import { Encourage, Homies, Tablet, Built } from "../../static/Images";


const SplashPage = () => {
  return (
    <div>
      <Row align="middle" style = {{backgroundColor: "#40A9FF"}}>
        <Col span={6} offset={3}>
          <img className="logo" src={LogoWhite} />
        </Col>
        <Col span={6} offset={3}>
          <Button type="primary" size={5} shape = "round">
            Sign In
          </Button>
          <Button size={5} shape = "round">
            Sign Up
          </Button>
        </Col>
      </Row>
      <Row align="middle" style = {{backgroundColor: "#40A9FF"}}>
        <Col span={6} offset={3}>
          Working together to make office hours more efficient for everyone
        </Col>
        <Col span={6}>
          <img className="dudes" src={Homies} />
        </Col>
      </Row>
      <Row align="middle">
        <Col span={6} offset={3}>
          <img className="tab" src={Tablet} />
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
          <img className="built" src={Built} />
        </Col>
      </Row>
      <Row align="middle">
        <Col span={6} offset={3}>
          <img className="encourage" src={Encourage} />
        </Col>
        <Col span={6} offset={6}>
          Encourage group learning
        </Col>
      </Row>
    </div>
  );
};

export default SplashPage

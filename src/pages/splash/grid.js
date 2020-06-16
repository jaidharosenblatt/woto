import { Row, Col } from 'antd';
import React from "react";
import { Encourage, Homies, Tablet, Built } from "../../static/Images";


const Grid = () => {
  return (
    <div>
      <Row align = "middle">
        <div style = {{backgroundColor: "#40A9FF"}}>
          <Col>
            <h1>
              Working together to make office hours more efficient for everyone
            </h1>
          </Col>
          <Col offset={8}>
            <img className="dudes" src={Homies} />
          </Col>
        </div>
      </Row>
      <Row>
        <Col span={12}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
      <Row>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
      </Row>
    </div>
  );
};

export default Grid

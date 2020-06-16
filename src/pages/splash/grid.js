import { Row, Col } from 'antd';
import React from "react";
import { Encourage, Homies, Tablet, Built } from "../../static/Images";


const Grid = () => {
  return (
    <div>
      <Row>
        <div span={24} style = {{backgroundColor: "#40A9FF"}}>
          <Col>
            Working together to make office hours more efficient for everyone
          </Col>
          <Col>
            <img className="dudes" src={Homies} />
          </Col>
        </div>
      </Row>
      <Row>
        <Col span={12}>
          <img className="tab" src={Tablet} />
        </Col>
        <Col span={12}>Get behind-the-scenes data about how students learn</Col>
      </Row>
      <Row>
        <Col span={12}>
          Built for online
        </Col>
        <Col span={12}>
          <img className="built" src={Built} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <img className="encourage" src={Encourage} />
        </Col>
        <Col span={12}>
          Encourage group learning
        </Col>
      </Row>
    </div>
  );
};

export default Grid

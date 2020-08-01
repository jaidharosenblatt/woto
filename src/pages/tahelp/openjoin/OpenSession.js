import React from "react";
import { Col, Space, Card } from "antd";
import { Hourglass } from "../../../static/Images";
import OpenSessionForm from "./OpenSessionForm";
import "./OpenSession.css";
/**
 * Wrap open session form in a card with a header
 * @param {props} course course for this office hours
 * @param {props} onSubmit callback to open session
 */
const OpenSession = (props) => {
  return (
    <div className="open-session-form">
      <Card
        title={
          <div className="open-session-form-header">
            <Space size={24}>
              <img src={Hourglass} alt="Hourglass" />
              <div>
                <h1>Create a New Session</h1>
                <h3>{props.course.code} Office Hours</h3>
              </div>
            </Space>
          </div>
        }
      >
        <Col span={24}>
          <OpenSessionForm {...props} />
        </Col>
      </Card>
    </div>
  );
};
export default OpenSession;

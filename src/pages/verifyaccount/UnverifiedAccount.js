import React from "react";
import { Col, Row, Space } from "antd";
import { EmailImage } from "../../static/Images";
import ReverifyAccountForm from "./ReverifyAccountForm";
import "./verify.css";

const UnverifiedAccount = () => {
  return (
    <Col span={24}>
      <Row gutter={16}>
        <Col span={24} align="center">
          <img className="small-hero-image" alt="hero" src={EmailImage} />
        </Col>
      </Row>
      <Row align="center">
        <Col span={8}>
          <Space direction="vertical">
            <h2>
              Please verify your account to in order to access your courses
            </h2>
            <ReverifyAccountForm />
          </Space>
        </Col>
      </Row>
    </Col>
  );
};

export default UnverifiedAccount;

import React, { useContext } from "react";
import { Col, Space, Button } from "antd";
import { EmailImage } from "../../static/Images";
import { AuthContext } from "../../contexts/AuthContext";

import "./verify.css";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";

const UnverifiedAccount = () => {
  const { state } = useContext(AuthContext);

  return (
    <NavBarCentered>
      <Col span={24} align="middle" style={{ margin: "auto", maxWidth: 550 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <h2>Please verify your email</h2>
          <p>
            You will need to verify your email before accessing or enrolling in
            courses
          </p>
          <img className="small-hero-image" alt="hero" src={EmailImage} />

          <p>
            An email has been sent to {state.user.email} with a link to verify
            your account. If you have not recieved the email after a few
            minutes, please check your spam folder
          </p>
          <Button size="large" type="primary">
            Resend Email
          </Button>
        </Space>
      </Col>
    </NavBarCentered>
  );
};

export default UnverifiedAccount;

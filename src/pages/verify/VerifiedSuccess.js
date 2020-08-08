import React, { useContext } from "react";
import { Col, Button } from "antd";
import { Link } from "react-router-dom";

import { AchievementImage } from "../../static/Images";
import { AuthContext, actions } from "../../contexts/AuthContext";
import "./verify.css";
// var url = window.location;
// ex: http://localhost:3000/verify/student/#key=084758yhroufgbk48y
//TODO have failed screen
const VerifyAccount = () => {
  const { state, dispatch } = useContext(AuthContext);
  if (!state.user.verified) {
    dispatch({ type: actions.LOGOUT });
  }
  return (
    <Col span={24}>
      <Col span={24} align="center">
        <img className="small-hero-image" alt="hero" src={AchievementImage} />
      </Col>
      <Col span={24} align="center">
        <Col span={10} align="center">
          <h2 className="verify-failed">Your account is verified</h2>
          <Link to="/">
            <Button size="large" type="primary">
              Get Started
            </Button>
          </Link>
        </Col>
      </Col>
    </Col>
  );
};

export default VerifyAccount;

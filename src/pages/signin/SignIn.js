import React from "react";
import { Row, Col } from "antd";
import "./SignIn.css"
import SignInForm from "../signin/signinform/SignInForm";
//import { Logo } from "../../static/Images";


/**
 * @tommytilton User sign in
 */
const SignIn = () => {
  return (
    <div className="SignInPage">
      <Row align="center">
        <Col xs={24} lg={24} align="center">
 
          <div className="signInForm">
            <SignInForm style={{display: "inlineBlock"}} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;

//         <img src={Logo} alt="Woto Logo" />
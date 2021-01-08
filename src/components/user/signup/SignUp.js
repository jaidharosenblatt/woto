import React from "react";
import { Col, Divider, Row } from "antd";
import { Link } from "react-router-dom";
import { Logo } from "../../../static/LoadedImages";
import VerticalSpace from "../../util-components/vertical-space/VerticalSpace";

import SignUpForm from "./SignUpForm";

import "./SignUp.css";
import StudentInstructorButtons from "../oauth/StudentInstructorButtons";

const styles = {
  logoWrapper: { marginBottom: "16px" },
  emphasize: { color: "#40a9ff" },
};

/**
 * @MatthewSclar @jaidharosenblatt Page for students to sign up.
 *Uses: SignUpForm component
 */
const SignUp = () => {
  // window.onbeforeunload = function() {
  //   return "Are you sure you want to leave?";
  // };

  return (
    <Row style={{ height: "100vh" }}>
      <Col xs={0} md={10}>
        <div className="ImageCard" />
      </Col>
      <Col xs={24} md={14}>
        <div className="form-wrapper">
          <VerticalSpace centered style={{ maxWidth: 500 }}>
            <Link to="/">
              <Logo />
            </Link>

            <h2>
              Be among the first to <span style={styles.emphasize}>revolutionize</span> office hours
            </h2>
            <p>Sign up using Duke Shibboleth</p>
            <StudentInstructorButtons />
            <Divider style={{ flexDirection: "row" }}>
              <h3>OR</h3>
            </Divider>

            <SignUpForm />
          </VerticalSpace>
        </div>
      </Col>
    </Row>
  );
};

export default SignUp;

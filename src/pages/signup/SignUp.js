import React from "react";
import { Col, Layout} from "antd";

import SignUpForm from "./SignUpForm";
import "./SignUp.css";

const { Content, Sider } = Layout;

/**
 * @MatthewSclar Page for students to sign up.
 *Uses: SignUpForm component
 */

const SignUp = () => {
  return (
    <Layout>
      <Col xs={0} md={10}>
        <Content style={{ backgroundColor: "#F4FBFF" }}>
          <div className="SignUpImageCard" />
        </Content>
      </Col>
      <Col xs={24} md={14}>
        <Sider style={{ backgroundColor: "white" }} width="100%">
          <SignUpForm />
        </Sider>
      </Col>
    </Layout>
  );
};

export default SignUp;

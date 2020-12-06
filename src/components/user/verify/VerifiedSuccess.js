import React from "react";
import { Col, Button } from "antd";
import { Link } from "react-router-dom";

import { AchievementImage } from "../../../static/LoadedImages";
import "./verify.css";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import { logout } from "../../../redux/auth/actionCreators";

/**
 * Page for showing a successful verification
 * URL should be of form: http://localhost:3000/verify/student/#key=084758yhroufgbk48y
 * @param {Function} logout actionCreator for logging out
 * @param {Object} user - user object from redux
 */
const VerifyAccount = (props) => {
  if (!props.user.verified) {
    props.logout();
  }
  return (
    <Col span={24}>
      <Col span={24} align="center">
        <AchievementImage className="small-hero-image" />
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

const mapStateToProps = (state) => {
  return { user: selectors.getUser(state) };
};
export default connect(mapStateToProps, { logout })(VerifyAccount);

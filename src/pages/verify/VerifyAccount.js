import React, { useEffect } from "react";
import { Col } from "antd";
import { BugImage } from "../../static/Images";
import "./verify.css";
import ReverifyAccountForm from "./ReverifyAccountForm";
import NavBarFooterCentered from "../../components/centeredpage/NavBarFooterCentered";
import selectors from "../../redux/selectors";
import auth from "../../redux/auth/actionCreators";

import { connect } from "react-redux";

/**
 * Try to verify an account and show error message on fail
 * Example url -> "/verify/student/#key=084758yhroufgbk48y"
 */
const VerifyAccount = () => {
  const { isAuthenticated } = props;
  useEffect(() => {
    const url = window.location.href; //url of the current page
    const userType = url.split("/verify/")[1].split("/")[0];
    const split = url.split("="); //this creates an array with key ([0] element) and value ([1] element)
    const verificationKey = split[1];

    async function _verifyUser() {
      await props.verifyUser(verificationKey, userType);
    }
    if (!isAuthenticated) {
      _verifyUser();
    }
  }, [isAuthenticated]);

  return (
    <NavBarFooterCentered>
      <Col span={24} align="center">
        <Col span={24} align="center">
          <img className="small-hero-image" alt="hero" src={BugImage} />
        </Col>

        <Col align="left" style={{ maxWidth: 300 }}>
          <h2 className="verify-failed">
            Sorry, we were unable to verify your account
          </h2>
          <ReverifyAccountForm />
        </Col>
      </Col>
    </NavBarFooterCentered>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: selectors.getAuthenticationStatus(state),
  };
};

const { verifyUser } = auth;
export default connect(mapStateToProps, { verifyUser })(VerifyAccount);

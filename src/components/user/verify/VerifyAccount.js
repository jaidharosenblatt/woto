import React, { useEffect } from "react";
import { Col } from "antd";
import { BugImage } from "../../../static/LoadedImages";
import "./verify.css";
import ReverifyAccountForm from "./ReverifyAccountForm";
import NavBarFooterCentered from "../../util-components/centeredpage/NavBarFooterCentered";
import selectors from "../../../redux/selectors";
import { verifyUser } from "../../../redux/auth/actionCreators";

import { connect } from "react-redux";

/**
 * Try to verify an account and show error message on fail
 * Example url -> "/verify/student/#key=084758yhroufgbk48y"
 */
const VerifyAccount = (props) => {
  const { isAuthenticated, isVerified, loading, error } = props;
  const _verifyUser = props.verifyUser;
  useEffect(() => {
    const url = window.location.href; //url of the current page
    const userType = url.split("/verify/")[1].split("/")[0];
    const split = url.split("="); //this creates an array with key ([0] element) and value ([1] element)
    const verificationKey = split[1];

    async function verify() {
      await _verifyUser(verificationKey, userType);
    }
    const userNotVerified = !isAuthenticated || !isVerified;
    if (userNotVerified && verificationKey && userType && !error) {
      verify();
    }
  }, [isAuthenticated, isVerified, loading, error, _verifyUser]);

  return (
    <NavBarFooterCentered>
      <Col span={24} align="center">
        <Col span={24} align="center">
          <BugImage className="small-hero-image" />
        </Col>

        <Col align="left" style={{ maxWidth: 400 }}>
          <h2 className="verify-failed">Sorry, we were unable to verify your account</h2>
          <ReverifyAccountForm />
        </Col>
      </Col>
    </NavBarFooterCentered>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: selectors.getAuthenticationStatus(state),
    isVerified: selectors.getVerificationStatus(state),
    loading: selectors.getPageLoading(state),
    error: selectors.getError(state),
  };
};

export default connect(mapStateToProps, { verifyUser })(VerifyAccount);

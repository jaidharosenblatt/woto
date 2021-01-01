import React, { useEffect } from "react";
import qs from "qs";
import { connect } from "react-redux";
import { authenticateWithOauth } from "../../../redux/auth/actionCreators";
import LoadingScreen from "../../util-components/spinner/LoadingScreen";
import { Redirect, useLocation } from "react-router-dom";
import selectors from "../../../redux/selectors";

const OauthRedirect = (props) => {
  const location = useLocation();
  const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const authenticate = props.authenticateWithOauth;

  useEffect(() => {
    async function auth() {
      await authenticate(code);
    }
    auth();
  }, [authenticate, code]);

  // Send user back to home
  if (props.error) {
    return <Redirect to="/signin" />;
  }

  return <LoadingScreen loading />;
};

const mapStateToProps = (state) => {
  return {
    error: selectors.getError(state),
  };
};
export default connect(mapStateToProps, { authenticateWithOauth })(
  OauthRedirect
);

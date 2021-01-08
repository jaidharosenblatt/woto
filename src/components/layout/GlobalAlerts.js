import { message } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";

/**
 * Wrap child components in an alert
 * Check redux for error state and if it exists display an alert
 * @param {Array} children
 */
const GlobalAlerts = (props) => {
  const { serverError } = props;
  useEffect(() => {
    if (serverError) {
      message.error(serverError);
    }
  }, [serverError]);

  return <div>{props.children}</div>;
};

const mapStateToProps = (state) => {
  return {
    serverError: selectors.getServerError(state),
  };
};

export default connect(mapStateToProps)(GlobalAlerts);

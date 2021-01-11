import { message } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";
import {
  clearServerError,
  clearServerSuccessMessage,
} from "../../redux/status/actionCreators";

/**
 * Wrap child components in an alert
 * Check redux for error state and if it exists display an alert
 * @param {Array} children
 */
const GlobalAlerts = (props) => {
  const { serverError, serverSuccess } = props;
  const [clearStarted, setClearStarted] = useState(false);
  const _clearSuccessMessage = props.clearServerSuccessMessage;
  const _clearError = props.clearServerError;
  useEffect(() => {
    async function clearMessage() {
      // clear message after 3 seconds (needs to match css transition)
      setClearStarted(true);

      setTimeout(() => {
        _clearSuccessMessage();
        _clearError();
        setClearStarted(false);
      }, 3000);
    }
    if (serverError) {
      message.error(serverError);
    }
    if (serverSuccess) {
      message.success(serverSuccess);
    }
    if (!clearStarted && message) {
      clearMessage();
    }
  }, [
    serverError,
    serverSuccess,
    _clearSuccessMessage,
    _clearError,
    setClearStarted,
    clearStarted,
  ]);

  return <div>{props.children}</div>;
};

const mapStateToProps = (state) => {
  return {
    serverError: selectors.getServerError(state),
    serverSuccess: selectors.getServerSuccess(state),
  };
};

export default connect(mapStateToProps, {
  clearServerSuccessMessage,
  clearServerError,
})(GlobalAlerts);

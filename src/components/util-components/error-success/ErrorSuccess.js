import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import { clearSuccessMessage, clearError } from "../../../redux/status/actionCreators";
import "./error-success.css";
/**
 * Display the current error or success message from redux
 * Uses a transition to have success/error slide up and down and fade
 * @param {Boolean} showSuccess whether or not to display success messages
 */
const ErrorSuccess = (props) => {
  const { success, error, showSuccess } = props;
  // needed so that async clearMessage calls don't stack
  const [clearStarted, setClearStarted] = useState(false);

  // message comes from redux
  let message;
  let className;
  if (success && showSuccess) {
    className = "success-message";
  }
  message = success;
  if (error) {
    className = "error-message";
    message = error;
  }
  const _clearSuccessMessage = props.clearSuccessMessage;
  const _clearError = props.clearError;

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
    if (!clearStarted && message) {
      clearMessage();
    }
  }, [_clearSuccessMessage, _clearError, clearStarted, setClearStarted, error, success, message]);

  return <p className={className}>{message}</p>;
};

const mapStateToProps = (state) => {
  return {
    error: selectors.getError(state),
    success: selectors.getSuccessMessage(state),
  };
};

export default connect(mapStateToProps, { clearSuccessMessage, clearError })(ErrorSuccess);

import React from "react";
import { Col, Space, Button } from "antd";
import NavBarCentered from "../../util-components/centeredpage/NavBarCentered";
import ReverifyAccountForm from "./ReverifyAccountForm";
import { EmailImage } from "../../../static/LoadedImages";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import { reverifyEmail } from "../../../redux/auth/actionCreators";

/**
 * Prompt user to verify their account
 * Use user object stored in state to provide email values or
 * allow user to enter email if no state
 */
const UnverifiedAccount = (props) => {
  let message;
  if (props.success) {
    message = props.success;
  }
  if (props.error) {
    message = props.error;
  }

  const handleResetEmail = async () => {
    await props.reverifyEmail(props.user.email);
  };
  return (
    <NavBarCentered>
      <Col span={24} align="middle" style={{ margin: "auto", maxWidth: 550 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <h2 style={{ fontSize: 24 }}>Please verify your email</h2>
          <p>
            {props.userIsInstructor
              ? "You will need to verify your email before creating a course"
              : "You will need to verify your email before accessing or enrolling in courses"}
          </p>

          <EmailImage className="small-hero-image" />

          {props.user ? (
            <>
              <p>
                An email has been sent to {props.user.email} with a link to
                verify your account. If you have not recieved the email after a
                few minutes, please check your spam folder. Note that some
                universities take up to 10 minutes to process emails.
              </p>
              <p className={props.error ? "error" : ""}>{message}</p>
              <Button onClick={handleResetEmail} size="large" type="primary">
                Resend Email
              </Button>
            </>
          ) : (
            <ReverifyAccountForm />
          )}
        </Space>
      </Col>
    </NavBarCentered>
  );
};

const mapStateToProps = (state) => {
  return {
    userIsInstructor: selectors.userIsInstructor(state),
    user: selectors.getUser(state),
    loading: selectors.getLoading(state),
    success: selectors.getSuccessMessage(state),
    error: selectors.getError(state),
  };
};
export default connect(mapStateToProps, { reverifyEmail })(UnverifiedAccount);

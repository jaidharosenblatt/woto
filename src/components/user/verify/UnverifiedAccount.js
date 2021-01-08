import React from "react";
import { Button } from "antd";
import ReverifyAccountForm from "./ReverifyAccountForm";
import { EmailImage, WaitingImage } from "../../../static/LoadedImages";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import { reverifyEmail } from "../../../redux/auth/actionCreators";
import PageCard from "../../util-components/centeredpage/PageCard";
import VerticalSpace from "../../util-components/vertical-space/VerticalSpace";
import ErrorSuccess from "../../util-components/error-success/ErrorSuccess";

/**
 * Prompt user to verify their account
 * Use user object stored in state to provide email values or
 * allow user to enter email if no state
 */
const UnverifiedAccount = (props) => {
  const name = props.user?.name?.split(" ")[0];

  const handleResetEmail = async () => {
    await props.reverifyEmail(props.user.email);
  };

  const userIsUnverifiedInstructor = props.user?.isOauthAuthenticated && !props.user?.verified;
  if (userIsUnverifiedInstructor) {
    return (
      <PageCard>
        <VerticalSpace centered style={{ maxWidth: 500 }}>
          <h2 style={{ fontSize: 24 }}>{name}, you are not yet a verified instructor</h2>
          <p>
            Please email jrr59@duke.edu from {props.user?.email} with proof that you are an
            accredited professor or faculty member to be verified. Please be patient, as we manually
            verify each instructor to ensure the safety of our users.
          </p>
          <WaitingImage className="small-hero-image" />
          <Button target="_blank" href="mailto:jrr59@duke.edu" size="large" type="primary">
            Email jrr59@duke.edu
          </Button>
        </VerticalSpace>
      </PageCard>
    );
  }

  return (
    <PageCard>
      <VerticalSpace style={{ maxWidth: 550 }} centered>
        <h2 style={{ fontSize: 24 }}>
          {name ? `${name}, please verify your email` : "Please verify your email"}
        </h2>
        <p>
          {props.userIsInstructor
            ? "You will need to verify your email before creating a course"
            : "You will need to verify your email before accessing or enrolling in courses"}
        </p>

        <EmailImage className="small-hero-image" />

        {props.user ? (
          <div className="reverify-wrapper">
            <p>
              We sent {props.user.email} a link to verify your account. If you have not received the
              email after a few minutes, please check your spam/promotions folder. Note that some
              universities take up to 10 minutes to process emails.
            </p>
            <ErrorSuccess showSuccess />
            <Button block onClick={handleResetEmail} size="large" type="primary">
              Resend Email
            </Button>
          </div>
        ) : (
          <ReverifyAccountForm />
        )}
      </VerticalSpace>
    </PageCard>
  );
};

const mapStateToProps = (state) => {
  return {
    userIsInstructor: selectors.userIsInstructor(state),
    user: selectors.getUser(state),
    loading: selectors.getLoading(state),
  };
};
export default connect(mapStateToProps, { reverifyEmail })(UnverifiedAccount);

import React, { useContext, useState } from "react";
import { Col, Space, Button } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";
import API from "../../api/API";
import ReverifyAccountForm from "./ReverifyAccountForm";
import { EmailImage } from "../../static/LoadedImages";
/**
 * Prompt user to verify their account
 * Use user object stored in state to provide email values or
 * allow user to enter email if no state
 */
const UnverifiedAccount = () => {
  const { state } = useContext(AuthContext);
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);

  const handleResetEmail = async () => {
    try {
      const res = await API.reverify(
        { email: state.user.email },
        state.userType
      );
      setMessage(res.message);
      setError(false);
    } catch (error) {
      setMessage("Unable to send reverification email");
      setError(true);
    }
  };
  return (
    <NavBarCentered>
      <Col span={24} align="middle" style={{ margin: "auto", maxWidth: 550 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <h2 style={{ fontSize: 24 }}>Please verify your email</h2>
          <p>
            {state && state.userType === "instructor"
              ? "You will need to verify your email before creating a course"
              : "You will need to verify your email before accessing or enrolling in courses"}
          </p>

          <EmailImage className="small-hero-image" />

          {state && state.user ? (
            <>
              <p>
                An email has been sent to {state.user.email} with a link to
                verify your account. If you have not recieved the email after a
                few minutes, please check your spam folder
              </p>
              <p className={error ? "error" : ""}>{message}</p>
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

export default UnverifiedAccount;

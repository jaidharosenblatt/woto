import React, { useState, useEffect } from "react";
import { Col, Button } from "antd";
import { Link } from "react-router-dom";
import API from "../../api/API";

import { AchievementImage, BugImage } from "../../static/Images";
import "./verifyaccount.css";
import LoadingScreen from "../../components/spinner/LoadingScreen";

//TODO have failed screen
const VerifyAccount = ({ userType }) => {
  const handleResetEmail = () => {
    console.log("reset email");
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  useEffect(() => {
    // var url = window.location;
    // ex: http://localhost:3000/verify/student/#key=084758yhroufgbk48y
    const hash = window.location.hash.substr(1); //url of the current page
    const arHash = hash.split("="); //this creates an array with key ([0] element) and value ([1] element)
    const verificationkey = arHash[1]; //recieve value
    try {
      API.verifyUser(verificationkey, userType);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  }, []);

  return (
    <LoadingScreen loading={loading}>
      <Col span={24} align="center">
        <div>
          <h2 className="verify-failed">
            {error
              ? "Sorry, we were unable to verify your account"
              : "Your account is verified!"}
          </h2>
          {error ? (
            <Button size="large" type="primary" onClick={handleResetEmail}>
              Resend verification email
            </Button>
          ) : (
            <Link to="/">
              <Button size="large" type="primary">
                Get started
              </Button>
            </Link>
          )}
        </div>

        <img
          className="verify-body-image"
          src={error ? BugImage : AchievementImage}
        />
      </Col>
    </LoadingScreen>
  );
};

export default VerifyAccount;

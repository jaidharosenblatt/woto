import React, { useState, useEffect, useContext } from "react";
import { Col, Button } from "antd";
import { Link } from "react-router-dom";
import API from "../../api/API";
import { LoadingContext } from "../../contexts/LoadingContext";
import { AchievementImage, BugImage } from "../../static/Images";
import "./verifyaccount.css";
import { AuthContext } from "../../contexts/AuthContext";

// var url = window.location;
// ex: http://localhost:3000/verify/student/#key=084758yhroufgbk48y
//TODO have failed screen
const VerifyAccount = ({ userType }) => {
  const { dispatch } = useContext(AuthContext);

  const handleResetEmail = () => {
    console.log("s");
  };

  const { setLoading } = useContext(LoadingContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const hash = window.location.hash.substr(1); //url of the current page
    const arHash = hash.split("="); //this creates an array with key ([0] element) and value ([1] element)
    const verificationkey = arHash[1];
    async function verifyUser() {
      try {
        const user = await API.verifyUser(verificationkey, userType);
        if (user != null) {
          dispatch({
            type: "LOGIN",
            payload: { user },
          });
        }
        console.log(user);
      } catch (error) {
        console.log(error);
        setError(true);
        dispatch({ type: "LOGOUT" });
      }
    }
    verifyUser();
    setLoading(false);
  }, [setLoading, userType, dispatch]);

  return (
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
              Get Started
            </Button>
          </Link>
        )}
      </div>

      <img
        className="hero-image"
        alt="hero"
        src={error ? BugImage : AchievementImage}
      />
    </Col>
  );
};

export default VerifyAccount;

import React, { useState, useEffect, useContext } from "react";
import { Col, Button } from "antd";
import { Link } from "react-router-dom";
import API from "../../api/API";
import { LoadingContext } from "../../contexts/LoadingContext";
import { AchievementImage, BugImage } from "../../static/Images";
import "./verify.css";
import { AuthContext } from "../../contexts/AuthContext";
import ReverifyAccountForm from "./ReverifyAccountForm";

// var url = window.location;
// ex: http://localhost:3000/verify/student/#key=084758yhroufgbk48y
//TODO have failed screen
const VerifyAccount = ({ userType }) => {
  const { state, dispatch } = useContext(AuthContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substr(1); //url of the current page
    const arHash = hash.split("="); //this creates an array with key ([0] element) and value ([1] element)
    const verificationkey = arHash[1];
    if (state.isAuthenticated) {
      dispatch({ type: "LOGOUT" });
    }
    setLoading(true);

    async function verifyUser() {
      try {
        const res = await API.verifyUser(verificationkey, userType);
        const user = res[userType];
        if (user != null) {
          console.log(`Logging in ${user.name}`);
          dispatch({
            type: "LOGIN",
            payload: { user, userType },
          });
          setError(false);
        }
        console.log(user);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }

    verifyUser();

    setLoading(false);
  }, [
    setLoading,
    userType,
    dispatch,
    state.isAuthenticated,
    state.user.verified,
  ]);

  return (
    <Col span={24}>
      <Col span={24} align="center">
        <img
          className="small-hero-image"
          alt="hero"
          src={error ? BugImage : AchievementImage}
        />
      </Col>

      <Col span={24} align="center">
        <Col span={10} align="left">
          <h2 className="verify-failed">
            {error
              ? "Sorry, we were unable to verify your account"
              : "Your account is verified!"}
          </h2>
          {error ? (
            <ReverifyAccountForm />
          ) : (
            <Link to="/">
              <Button size="large" type="primary">
                Get Started
              </Button>
            </Link>
          )}
        </Col>
      </Col>
    </Col>
  );
};

export default VerifyAccount;

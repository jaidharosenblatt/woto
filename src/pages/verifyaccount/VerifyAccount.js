import React, { useState, useEffect, useContext } from "react";
import { Col } from "antd";
import API from "../../api/API";
import { LoadingContext } from "../../contexts/LoadingContext";
import { BugImage } from "../../static/Images";
import "./verify.css";
import { AuthContext } from "../../contexts/AuthContext";
import ReverifyAccountForm from "./ReverifyAccountForm";

// var url = window.location;
// ex: http://localhost:3000/verify/student/#key=084758yhroufgbk48y
//TODO have failed screen
const VerifyAccount = ({ userType }) => {
  console.log("verifying account");

  const { state, dispatch } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);

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
        }
        console.log(user);
      } catch (error) {
        console.log(error);
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
        <img className="small-hero-image" alt="hero" src={BugImage} />
      </Col>
      <Col span={24} align="center">
        <Col span={10} align="left">
          <h2 className="verify-failed">
            Sorry, we were unable to verify your account
          </h2>
          <ReverifyAccountForm />
        </Col>
      </Col>
    </Col>
  );
};

export default VerifyAccount;

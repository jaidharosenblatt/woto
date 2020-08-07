import React, { useEffect, useContext, useState } from "react";
import { Col } from "antd";
import API from "../../api/API";
import { BugImage } from "../../static/Images";
import "./verify.css";
import { AuthContext, actions } from "../../contexts/AuthContext";
import ReverifyAccountForm from "./ReverifyAccountForm";
import LoadingScreen from "../../components/spinner/LoadingScreen";
import NavBarFooterCentered from "../../components/centeredpage/NavBarFooterCentered";

/**
 * Try to verify an account and show error message on fail
 * Example url -> "/verify/student/#key=084758yhroufgbk48y"
 */
const VerifyAccount = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const url = window.location.href; //url of the current page
  const userType = url.split("/verify/")[1].split("/")[0];

  useEffect(() => {
    const url = window.location.href; //url of the current page
    const split = url.split("="); //this creates an array with key ([0] element) and value ([1] element)
    const verificationkey = split[1];
    console.log(verificationkey);

    async function verifyUser() {
      try {
        setLoading(true);
        const res = await API.verifyUser(verificationkey, userType);
        const user = res[userType];
        if (user != null) {
          console.log(`Logging in ${user.name}`);
          dispatch({
            type: actions.LOAD,
            payload: { user },
          });
        }
        console.log(user);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    if (!state.isAuthenticated) {
      verifyUser();
    } else {
      setLoading(false);
    }
  }, [state.isAuthenticated, userType, dispatch]);

  return (
    <LoadingScreen loading={loading}>
      <NavBarFooterCentered>
        <Col span={24} align="center">
          <Col span={24} align="center">
            <img className="small-hero-image" alt="hero" src={BugImage} />
          </Col>

          <Col align="left" style={{ maxWidth: 300 }}>
            <h2 className="verify-failed">
              Sorry, we were unable to verify your account
            </h2>
            <ReverifyAccountForm />
          </Col>
        </Col>
      </NavBarFooterCentered>
    </LoadingScreen>
  );
};

export default VerifyAccount;

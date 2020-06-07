import React from "react";
import {Row,Col} from "antd";

import WorkingImageCard from '../../components/WorkingImageCard';
import SignUpForm from './Form/SignUpForm';
import { Logo } from "../../static/Images";
import "./SignUp.css";

/**
 * @MatthewSclar Page for students to sign up.
 */

const SignUp = () => {
  return (
  <div className="PAGE">
    <Row align="middle" >
      <Col flex xs={{span: 0}} sm={{span:0}} md = {{span:0}} lg={{span:8}} xl={{span:10}}>
        <div className ="workingImage">
          <WorkingImageCard
            alt="Girl Working at Desk"
            />
        </div>
        </Col>

      <Col flex xs = {{span:24}} sm={{span: 24}} md={{span:24, offset:0}} lg={{span:16}} xl={{span:14}}>
        <img className= "Logo" src ={Logo} alt ="Woto Logo" />
        <SignUpForm />
      </Col>

  </Row>
  </div>
  );
};

export default SignUp;

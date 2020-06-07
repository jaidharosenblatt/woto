import React from "react";
import {Row,Col} from "antd";

import WorkingImageCard from '../../components/WorkingImageCard';
import SignUpForm from '../../components/SignUpForm';
import "./SignUp.css";

/**
 * @MatthewSclar Page for students to sign up.
 */

const SignUp = () => {
  return (
  <div className="PAGE">
    <Row align="middle" >
      <Col flex xs={{span: 0}}  md = {{span:9}} >
        <div className ="image">
        <WorkingImageCard
          alt="Girl Working at Desk"
        />
        </div>
        </Col>

      <Col xs = {{span:24}} md ={{ span:15, offset: 0 }}>
        <SignUpForm />
      </Col>

  </Row>
  </div>
  );
};

export default SignUp;


//   <div className= 'page'>
//   <Row align='middle'>
//     <Col className='ImageCard' flex span ={9}>
//           <WorkingImageCard
//             image = {WorkingImage}
//             alt = "Girl working at desk">
//           </WorkingImageCard>
//     </Col>
//
//     <Col span={15}>
//       <SignUpForm> </SignUpForm>
//     </Col>
// </Row>
//
// </div>

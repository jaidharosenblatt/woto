import React from "react";
import {Row,Col} from "antd";

import WorkingImageCard from '../../components/WorkingImageCard';
import SignUpForm from '../../components/SignUpForm';
import { WorkingImage } from '../../static/Images';
import "./SignUp.css";

/**
 * @MatthewSclar Page for students to sign up.
 */

const SignUp = () => {
  return (
    <Row align="middle">
      <Col flex span={12}>
        <WorkingImageCard
        image ={WorkingImage}
        alt="Girl Working at Desk"
        />
        </Col>

      <Col span={11} offset={1}>
        <SignUpForm />
      </Col>

  </Row>
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

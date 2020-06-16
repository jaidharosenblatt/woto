import React from 'react';
import {Form, TimePicker, DatePicker,Row, Col} from 'antd';

import {ClockImage} from "../../static/Images"


/**
 * @MatthewSclar Open Session Form
 *
 */

const OpenSessionForm = ({courseName}) =>{
  return(
    <div>
    <h1>
      <b style={{ width: "150%", color: "#40a9ff" }}>{courseName} Office Hours</b>
    </h1>

    <Row>
      <Col xs={3}>
        <img src ={ClockImage} style={{position:"relative", bottom:"4px"}} />
      </Col>

      <Col xs={21}>
        <h2 style ={{color:"grey"}}>
          No Active Sessions
          </h2>
      </Col>
    </Row>
    <br />
    <h2> Open a new Session</h2>




    <Row align="center">
      <Col xs={3}>
        <img src ={ClockImage} />
      </Col>
      <Col xs ={10} >
        <TimePicker />
      </Col>
      <Col xs={1}>
        <h2 style={{position:"relative", top:"5px"}}> -</h2>
      </Col>
      <Col xs ={10} >
        <TimePicker />
      </Col>
    </Row>



     </div>
  );
}
export default OpenSessionForm;

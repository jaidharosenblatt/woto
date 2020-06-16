import React from 'react';
import {Form, TimePicker, DatePicker,Row, Col} from 'antd';

import {ClockImage, LocationImage, ZoomVideoImage} from "../../static/Images"
import TextInputReq from "../../components/form/TextInputReq";
import SubmitButton from "../../components/form/SubmitButton";
const {RangePicker} = TimePicker;


/**
 * @MatthewSclar Open Session Form
 *
 */

  const onFinish = (values) => {
     console.log('Success:', values );
   };


 const onFinishFailed = (errorInfo) => {
   console.log("Failed:", errorInfo);
 };

const OpenSessionForm = ({courseName}) =>{


  return(
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical">
      <h1>
        <b style={{ color: "#40a9ff" }}>{courseName} Office Hours</b>
      </h1>
        <h2 style ={{color:"grey"}}>
          No Active Sessions
        </h2>

        <br/>
      <h1 style ={{color:"black"}}> <b>Open a new Session</b></h1>

    <Row align="center">
      <Col xs={3}>
        <img src ={ClockImage} />
      </Col>
      <Col xs ={21} >
        <Form.Item name="range-picker" rules={[{required:true,message:"Please select the time of the session"}]} >
          <RangePicker use12Hours={true} minuteStep={15} format={'HH:mm'} />
        </Form.Item>
      </Col>
    </Row>
    <Row align="center">
      <Col xs={3}>
        <img src ={LocationImage} />
      </Col>
      <Col xs ={21} >
        <p style={{width:"50%",position:"relative", top:"2px"}}>Virtual</p>
      </Col>
    </Row>
    <Row align="center">
      <Col xs={3}>
        <img src ={ZoomVideoImage}  style={{width:"75%", position:"relative", top:"3px"}}/>
      </Col>
      <Col xs ={21} >
        <TextInputReq
          name="zoomlink"
          placeholder="duke.zoom.us/1234567890"
          message="Please enter a Zoom Link to create a session."/>
      </Col>
    </Row>

<SubmitButton CTA="Open Session" />

     </Form>
  );
}
export default OpenSessionForm;

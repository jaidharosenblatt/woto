import React from 'react';
import {Row, Col, Card} from 'antd';
import {AlanResnick} from "../../static/Images";
import "./about.css";
const { Meta } = Card;

const About = () =>{

var people ={
    alan:{
        name: "Alan Resnick",
        title: "Wife has hair",
        image: AlanResnick
    }
}

 return(<>

    <Row gutter={[0,100]}align="center" style={{ backgroundColor: "#40A9FF" }}>
    <div className="header-wrapper">
      <Col align="left" xs={24} >
        <div className="headerText">
          <h1 className="header-title">
            <b className="emphasize">About Us</b> 
            <hr style={{height:"2px",borderWidth:"0",color:"white",backgroundColor:"white"}}/>
          </h1>
        </div>
      </Col>
    </div>
  </Row>


    <Row gutter={[0,20]} align="center">
        <Col span={15} align="left">
            <h1> What is Woto?</h1>
        </Col>
    </Row>

     <Row gutter={[0,100]} align="center">
        <Col span={15}>
             <p> Woto is an easy to bend noodle. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
        </Col>
    </Row>
  
    <Row gutter={[0,20]} align="center">
        <Col align="left" xs={15} >
            <h1>A Brief History of Woto</h1>
        </Col>
    </Row>
    <Row gutter={[0,100]} align="center">
        <Col align="left" span={15}>
             <p> Woto is an easy to bend noodle. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
        </Col>
    </Row>

    <Row gutter={[0,20]} align="center">
        <Col align="left" xs={15} >
            <h1>Our Team</h1>
        </Col>
    </Row>
    <Row gutter={[20,20]} align="center">
       <Col align="left" xs={15}>
            <Card style={{width:"240px"}} cover={<img alt="example" src= {AlanResnick}/>} >
                <Meta title ="Alan Resnick" description="Wife has hair" />
            </Card>
       </Col>
    </Row>


    </>);
}


export default About;
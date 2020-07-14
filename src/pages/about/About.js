import React from 'react';
import {Row, Col } from 'antd';
import DisplayCards from './DisplayCards';
import {Matthew, Jaidha, Noah, Tommy, Nicole, Ameer,
     Mohammad, Amjad, Yaseer, Ahmad, Daniel, Kaden,
     Yasa} from "../../static/Images";
import "./about.css";


const About = () =>{

var people =[
  
    {
        name: "Jaidha Rosenblatt",
        title: "Co-Founder, Frontend Engineer",
        image: Jaidha
    },
    {
        name: "Matthew Sclar",
        title: "Co-Founder, Outreach and Marketing",
        image: Matthew
    },
    {
        name: "Noah Karpel",
        title: "Co-Founder, Gets no equity",
        image: Noah
    },
    {
        name: "Tommy Tilton",
        title: "Co-Founder, Frontend Engineer",
        image: Tommy
    },
    {
        name: "Yasa Baig",
        title: "Lead Backend Engineer",
        image: Yasa
    },
    {
        name: "Daniel Hwang",
        title: "Backend Enngineer",
        image: Daniel
    },
    {
        name: "Nicole Malpeli",
        title: "Junior Developer",
        image: Nicole
    },
    {
        name: "Ahmad Khan",
        title: "Junior Developer",
        image: Ahmad
    },
    {
        name: "Ameer Syedibrahim",
        title: "Junior Developer",
        image: Ameer
    },
    {
        name: "Amjad Syedibrahim",
        title: "Junior Developer",
        image: Amjad
    },
    {
        name: "Mohammad Khatami",
        title: "Junior Developer",
        image: Mohammad
    },
    {
        name: "Kaden Rosenblatt",
        title: "Junior Developer",
        image: Kaden
    },
    {
        name: "Yaseer Elmzoudi",
        title: "Junior Developer",
        image: Yaseer
    },


];

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
             <p style={{paddingBottom:"20px"}}> Welcome to Woto, a web application that brings university office hours into a virtual environment. Woto implements Data Analytics and Virtual Collaborative Work spaces to help all instructors simplify and improve the learning experience for students outside of the classroom. <b>Office hours</b> and <b>Collaboration</b> are fundamental components of higher level education that have begun to be hindered by increasing class sizes and as of recent, the global pandemic that has forced universities online.  </p>                 
            <p>Woto seeks to restore a collaborative and efficient environment in the classroom by categorizing questions asked into the broader concepts students are struggling with and predicting future office hour attendance, for instructors. Woto also provides students with a collaborative platform where they can work together and office hours sessions that feature real time analytics including wait times, queue numbers, and question distributions. </p> 

        </Col>
    </Row>
  
    <Row gutter={[0,20]} align="center">
        <Col align="left" xs={15} >
            <h1>A Brief History of Woto</h1>
        </Col>
    </Row>
    <Row gutter={[0,100]} align="center">
        <Col align="left" span={15}>
             <p> In March 2020, our team came together and identified a clear problem that had been tainting our computer science experience, overcrowded office hours.
                 In recent years numbers of computer science students has skyrocketed while the resources available to those students have seen little change. On top of this initial problems
                 universities were being forced to go online as a global pandemic threatened the health of students, thereby taking away the collaborative aspect many of these courses previously had.
                 We quickly set out to create a solution, and began our work on Woto.
            </p>
        </Col>
    </Row>

    <Row gutter={[0,20]} align="center">
        <Col align="left" xs={15} >
            <h1>Our Team</h1>
        </Col>
    </Row>
    <Row align="center">
        <Col span={15}>
             <p> A dedicated group of Duke students seeking to revolutionize Office Hours around the country. </p>
        </Col>
    </Row>
    <Row align="center">
       <Col align="center" xs={15} lg={15}>
            <DisplayCards people={people} />
       </Col>
    </Row>


   

    </>);
}


export default About;
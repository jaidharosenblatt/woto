import React from "react";
import { Space } from "antd";
import DisplayCards from "./DisplayCards";
import {
  Matthew,
  Jaidha,
  Noah,
  Tommy,
  Nicole,
  Ameer,
  Mohammad,
  Amjad,
  Yaseer,
  Ahmad,
  Daniel,
  Kaden,
  Yasa,
} from "../../static/Images";
import "./about.css";

const About = () => {
  window.scrollTo(0, 0);

  var people = [
    {
      name: "Jaidha Rosenblatt",
      title: "Co-Founder",
      image: Jaidha,
    },
    {
      name: "Matthew Sclar",
      title: "Co-Founder",
      image: Matthew,
    },
    {
      name: "Noah Karpel",
      title: "Co-Founder",
      image: Noah,
    },
    {
      name: "Tommy Tilton",
      title: "Co-Founder",
      image: Tommy,
    },
    {
      name: "Yasa Baig",
      title: "Chief Technology Officer",
      image: Yasa,
    },
    {
      name: "Daniel Hwang",
      title: "Backend Engineer",
      image: Daniel,
    },
  ];

  return (
    <div className="about">
      <div className="header-wrapper">
        <div className="header-text">
          <h1 className="header-title">About Us</h1>
        </div>
      </div>

      <div className="body">
        <Space style={{ width: "100%" }} direction="vertical" size={24}>
          <Space direction="vertical">
            <h1> What is Woto?</h1>
            <p>
              Welcome to Woto, a web application that brings university office
              hours into a virtual environment. Woto implements Data Analytics
              and Virtual Collaborative Work spaces to help all instructors
              simplify and improve the learning experience for students outside
              of the classroom. <b>Office hours</b> and <b>Collaboration</b> are
              fundamental components of higher level education that have begun
              to be hindered by increasing class sizes and as of recent, the
              global pandemic that has forced universities online.
            </p>
            <p>
              Woto seeks to restore a collaborative and efficient environment in
              the classroom by categorizing questions asked into the broader
              concepts students are struggling with and predicting future office
              hour attendance, for instructors. Woto also provides students with
              a collaborative platform where they can work together and office
              hours sessions that feature real time analytics including wait
              times, queue numbers, and question distributions.
            </p>
          </Space>
          <Space direction="vertical">
            <h1> A Brief History of Woto</h1>
            <p>
              In March 2020, our team came together and identified a clear
              problem that had been tainting our computer science experience,
              overcrowded office hours. In recent years numbers of computer
              science students has skyrocketed while the resources available to
              those students have seen little change. On top of this initial
              problems universities were being forced to go online as a global
              pandemic threatened the health of students, thereby taking away
              the collaborative aspect many of these courses previously had. We
              quickly set out to create a solution, and began our work on Woto.
            </p>
          </Space>
          <Space direction="vertical">
            <h1>Our Team</h1>
            <p>
              A dedicated group of Duke students seeking to revolutionize Office
              Hours around the country.
            </p>
            <DisplayCards people={people} />
            <p>
              A special thanks to Amjad Syedibrahim, Ameer Syedibrahim, Kaden
              Rosenblatt, Ahmad Khan, Nicole Malpeli, Mohammad Khatami, and
              Yaseer Elmzoudi for their contributions
            </p>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default About;

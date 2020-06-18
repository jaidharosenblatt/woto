import React from "react";
import "./Home.css";
import { Row, Col } from "antd";
// import SpecificSession from "./pages/SpecificSession";
import HomeHeader from "./HomeHeader";
const Home = (props) => {
  return (
    <div style={{ height: "120%", backgroundColor: "red" }}>
      <Row>
        <Col>
          <HomeHeader
            title={props.courseName}
            description={
              "Utilize key metrics broken down by day of the week and time of day to more efficiently schedule office hours"
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;

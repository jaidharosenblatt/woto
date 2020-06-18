import React from "react";
import "./Home.css";
import { Row, Col } from "antd";
// import SpecificSession from "./pages/SpecificSession";
import HomeHeader from "./HomeHeader";
import DescriptionDecider from "./DescriptionDecider";

const Home = (props) => {
  const description = DescriptionDecider(props.dashPage);
  return (
    <div style={{ height: "120%", backgroundColor: "none" }}>
      <Row>
        <Col>
          <HomeHeader
            class={props.courseName}
            page={props.dashPage}
            description={description}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;

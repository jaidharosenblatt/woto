import React from "react";
import "./Home.css";
import { Row, Col } from "antd";
// import SpecificSession from "./pages/SpecificSession";
import HomeHeader from "./HomeHeader";
import DescriptionDecider from "./DescriptionDecider";
import DateSelection from "./DateSelection";
import PageDecider from "./PageDecider";

/**@kadenrosenblatt
 * @prop courseName current class name
 * @prop dashPage the name of the current page on the dashboard to display
 * prints out the content of the specific dashboard page
 */

const Home = (props) => {
  const description = DescriptionDecider(props.dashPage);
  const dateSelection = DateSelection(props.dashPage);
  return (
    <div
      style={{
        height: "120%",
        backgroundColor: "rgb(247, 247, 247)",
        padding: "0px 20px ",
      }}
    >
      <Row>
        <Col>
          <HomeHeader
            class={props.courseName}
            page={props.dashPage}
            description={description}
          />
        </Col>
      </Row>
      <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        {dateSelection}
      </Row>
      <Row>{PageDecider(props.dashPage)}</Row>
    </div>
  );
};

export default Home;

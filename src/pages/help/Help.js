import React from "react";
import { Row, Col } from "antd";
import TitleHeader from "../../components/TitleHeader";
import LocationTimeTag from "../../components/icon-tags/LocationTimeTag";
import { HelpImage } from "../../static/Images";
import "./Help.css";

/**
 * @jaidharosenblatt Page for students to recieve help for a given course
 */
class Help extends React.Component {
  render() {
    return (
      <Row align="center">
        <Col flex xs={20} lg={14}>
          <TitleHeader
            title="CS330 Office Hours"
            alt="Help"
            image={HelpImage}
            details={
              <LocationTimeTag location="Virtual" time="Now until 4pm" />
            }
          />
        </Col>
      </Row>
    );
  }
}

export default Help;

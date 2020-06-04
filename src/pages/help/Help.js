import React from "react";
import { Row, Col } from "antd";
import TitleHeader from "../../components/TitleHeader";
import IconTag from "../../components/IconTag";
import { HelpImage, LocationImage, ClockImage } from "../../static/Images";
import "./Help.css";

class Help extends React.Component {
  render() {
    const sessionDetail = (
      <div className="IconTags">
        <IconTag tag="Virtual" image={LocationImage} alt="Pin" />
        <IconTag tag="Now - 4pm" image={ClockImage} alt="Clock" />
      </div>
    );
    return (
      <Row align="center">
        <Col flex xs={{ span: 20 }} lg={{ span: 14 }}>
          <TitleHeader
            title="CS330 Office Hours"
            alt="Help"
            image={HelpImage}
            details={sessionDetail}
          />
        </Col>
      </Row>
    );
  }
}

export default Help;

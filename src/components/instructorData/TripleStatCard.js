import React from "react";
import { Row, Col } from "antd";
import StatWithIconCard from "../../components/instructorData/StatWithIconCard"
import { SmileBlackImage, HelpBlackOutline, FrowmBlackOutline } from "../../static/Images";
import Stat from "../stat/Stat";

/**
 * @tommytilton Display stat cards based on student views
 */

const TripleStatCard = (props) => {
    return (
      <Row>
        <Col span={8}>
          <StatWithIconCard
            title="Satisfaction Rate"
            value = {props.satisfactionRate}
            image={props.satisfactionImage}
          />
        </Col>
        <Col span={8}>
          <StatWithIconCard
            title="Students Seen"
            value={props.studentsSeen}
            image={HelpBlackOutline}
          />
        </Col>
        <Col span={8}>
          <StatWithIconCard
            title="Students Not Helped"
            value={props.notHelped}
            image={FrowmBlackOutline}
          />
        </Col>
      </Row>
    );
  };
  
  export default TripleStatCard;
  
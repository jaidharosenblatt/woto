import React from "react";
import { Row, Col } from "antd";
import StatWithIconCard from "../../components/instructorData/StatWithIconCard";
import { HelpBlackOutline, FrowmBlackOutline } from "../../static/Images";

/**
 * @tommytilton Display stat cards based on student views
 */

const TripleStatCard = (props) => {
  return (
    <Col span={24}>
      <Row>
      
      <Col xs={24} md={8}>
        <StatWithIconCard
          title="Satisfaction Rate"
          value={props.satisfactionRate}
          image={props.satisfactionImage}
        />
      </Col>
      <Col xs={24} md={8}>
        <StatWithIconCard
          title="Students Seen"
          value={props.studentsSeen}
          image={HelpBlackOutline}
        />
      </Col>
      <Col xs={24} md={8}>
        <StatWithIconCard
          title="Students Not Helped"
          value={props.notHelped}
          image={FrowmBlackOutline}
        />
      </Col>
    </Row>
      </Col>
    
  );
};

export default TripleStatCard;

import React from "react";
import { Row, Col } from "antd";
import StatWithIconCard from "../../components/instructorData/StatWithIconCard";
import { HelpBlackOutline, FrowmBlackOutline, Schedule } from "../../static/Images";

/**
 * @tommytilton Display stat cards based on student views
 */

const TripleStatCardSpecificTA = (props) => {
  return (
    <Col span={24}> 
    <Row>
      <Col sm={24} md={8}>
        <StatWithIconCard
          title="Satisfaction Rate"
          value={props.satisfactionRate}
          image={props.satisfactionImage}
        />
      </Col>
      <Col sm={24} md={8}>
        <StatWithIconCard
          title="Students Seen"
          value={props.studentsSeen}
          image={HelpBlackOutline}
        />
      </Col>
      <Col sm={24} md={8}>
        <StatWithIconCard
          title="Sessions Attended"
          value={props.sessionsAttended}
          image={Schedule}
        />
      </Col>
    </Row>
    </Col>
  );
};

export default TripleStatCardSpecificTA;

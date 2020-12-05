import React from "react";
import { Row, Col } from "antd";
import StatWithIconCard from "./StatWithIconCard";
import { HelpBlackOutline, Schedule } from "../../../static/Images";

/**
 * @tommytilton Display stat cards based on student views
 */

const TripleStatCardSpecificTA = (props) => {
  return (
    <Col span={24}>
      <Row>
        <Col xs={24} sm={8}>
          <StatWithIconCard
            title="Satisfaction Rate"
            value={props.satisfactionRate}
            image={props.satisfactionImage}
          />
        </Col>
        <Col xs={24} sm={8}>
          <StatWithIconCard
            title="Questions Asked"
            value={props.studentsSeen}
            image={HelpBlackOutline}
          />
        </Col>
        <Col xs={24} sm={8}>
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

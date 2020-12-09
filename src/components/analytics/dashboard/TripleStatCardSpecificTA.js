import React from "react";
import { Row, Col } from "antd";
import StatWithIconCard from "./StatWithIconCard";
import {
  LikeOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

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
            image={<LikeOutlined />}
          />
        </Col>
        <Col xs={24} sm={8}>
          <StatWithIconCard
            title="Questions Asked"
            value={props.studentsSeen}
            image={<TeamOutlined />}
          />
        </Col>
        <Col xs={24} sm={8}>
          <StatWithIconCard
            title="Sessions Attended"
            value={props.sessionsAttended}
            image={<CalendarOutlined />}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default TripleStatCardSpecificTA;

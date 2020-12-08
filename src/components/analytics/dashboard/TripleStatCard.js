import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import StatWithIconCard from "./StatWithIconCard";
import {
  DotChartOutlined,
  TeamOutlined,
  FrownOutlined,
} from "@ant-design/icons";

/**
 * @tommytilton Display stat cards based on student views
 */

const TripleStatCard = (props) => {
  return (
    <Col span={24}>
      <Row>
        <Col xs={24} sm={8}>
          <StatWithIconCard
            title="Satisfaction Rate"
            value={props.satisfactionRate}
            image={<DotChartOutlined />}
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
          <Link to="nothelped">
            <StatWithIconCard
              title="Students Not Helped"
              value={props.notHelped}
              image={<FrownOutlined />}
            />
          </Link>
        </Col>
      </Row>
    </Col>
  );
};

export default TripleStatCard;

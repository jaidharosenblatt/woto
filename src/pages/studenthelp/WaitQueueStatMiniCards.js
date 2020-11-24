import React, { useContext } from "react";
import { Row, Col } from "antd";
import {
  ClockCircleOutlined,
  TeamOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import MiniStat from "../../components/stat/MiniStat";
import { CourseContext } from "./util/CourseContext";
import redux from "../../redux/courses";
import { connect } from "react-redux";

import { convertTimeString } from "../../utilfunctions/timeAgo";

const WaitQueueStatMiniCards = (props) => {
  const courseID = useContext(CourseContext);
  const { stats, session, activeQuestion } = redux.select(
    props.courses,
    courseID
  );

  const queuePosition = stats?.position;
  const averageWait =
    stats?.averageLength === 0
      ? session?.interactionLength
      : stats?.averageLength === 0;
  const joinedAt = activeQuestion?.createdAt;
  return (
    <Row>
      <Col xs={24} md={8}>
        <MiniStat
          label="Your Place in Queue"
          icon={
            <div style={{ backgroundColor: "#40A9FF" }} className="circle-icon">
              <TeamOutlined />
            </div>
          }
          text={`${queuePosition} of 10`}
        />
      </Col>

      <Col
        xs={24}
        md={8}
        style={{ marginLeft: -8, marginRight: -8 }}
        className="bordered-stat"
      >
        <MiniStat
          label="Expected Wait Time"
          icon={
            <div style={{ backgroundColor: "#ffa940" }} className="circle-icon">
              <ClockCircleOutlined />
            </div>
          }
          text={`${(queuePosition - 1) * averageWait} mins`}
          unit={`Using ${averageWait} min avg. interaction length`}
        />
      </Col>

      <Col xs={24} md={8}>
        <MiniStat
          label="Joined Queue At"
          icon={
            <div style={{ backgroundColor: "#9254de" }} className="circle-icon">
              <HistoryOutlined />
            </div>
          }
          text={convertTimeString(joinedAt)}
        />
      </Col>
    </Row>
  );
};

export default connect(redux.mapStateToProps, redux)(WaitQueueStatMiniCards);

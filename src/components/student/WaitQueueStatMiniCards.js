import React from "react";
import { Row, Col } from "antd";
import {
  ClockCircleOutlined,
  TeamOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import MiniStat from "../analytics/sessions/MiniStat";
import { connect } from "react-redux";

import util from "../../util";
import selectors from "../../redux/selectors";

const WaitQueueStatMiniCards = (props) => {
  const { stats, session, activeQuestion } = props;

  const queuePosition = util.getOrdinalSuffix(stats?.position) + " in queue";
  const averageWait =
    stats?.averageLength === 0
      ? session?.interactionLength
      : stats?.averageLength;
  const expectedWait = (stats.position - 1) * averageWait;
  const joinedAt = util.convertTimeString(activeQuestion?.createdAt);
  return (
    <Row>
      <Col xs={24} md={8}>
        <MiniStat
          label={stats.position === 1 ? "You're Next!" : "Place in Queue"}
          icon={
            <div style={{ backgroundColor: "#40A9FF" }} className="circle-icon">
              <TeamOutlined />
            </div>
          }
          text={queuePosition}
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
          text={`${expectedWait} mins`}
          unit={`Using ${averageWait} min avg. wait time`}
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
          text={joinedAt}
        />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    stats: selectors.getStats(state),
    session: selectors.getSession(state),
    activeQuestion: selectors.getActiveQuestion(state),
  };
};

export default connect(mapStateToProps)(WaitQueueStatMiniCards);

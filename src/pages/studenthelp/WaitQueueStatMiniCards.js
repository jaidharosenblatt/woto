import React, { useContext } from "react";
import { Row, Col } from "antd";
import {
  ClockCircleOutlined,
  TeamOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import MiniStat from "../../components/stat/MiniStat";
import { HelpContext } from "./util/HelpContext";

import { convertTimeString } from "../../utilfunctions/timeAgo";

const WaitQueueStatMiniCards = () => {
  const { state } = useContext(HelpContext);

  const queuePosition = state.stats.position;
  const averageWait =
    state.stats.averageLength === 0
      ? state.session.interactionLength
      : state.stats.averageLength === 0;
  const joinedAt = state.question.createdAt;
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
          text={`${queuePosition * averageWait} mins`}
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
export default WaitQueueStatMiniCards;

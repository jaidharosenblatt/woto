import React from "react";
import { Col, Card, Row, Space } from "antd";

import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";

import { getOrdinalSuffix } from "../../utilfunctions/getOrdinalSuffix";
import WaitQueueStatMiniCards from "../../components/stat/WaitQueueStatMiniCards";

const QueueStatus = (props) => {
  const queuePosition = 2;

  return (
    <Card
      title={
        <Row align="middle">
          <Col xs={12} md={14}>
            <h2>You are {getOrdinalSuffix(queuePosition)} in the Queue</h2>
          </Col>
          <Col xs={12} md={10} align="right">
            <Space>
              <LeaveQueueButton handleLeave={props.leaveTAQueue} />
            </Space>
          </Col>
        </Row>
      }
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <WaitQueueStatMiniCards
          joinedAt={props.session && props.question.createdAt}
          queuePosition={queuePosition}
        />
      </Space>
    </Card>
  );
};

export default QueueStatus;

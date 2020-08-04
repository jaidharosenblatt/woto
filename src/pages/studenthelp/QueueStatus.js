import React from "react";
import { Col, Card, Row, Space } from "antd";

import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";

import EditSubmission from "../../components/buttons/EditSubmission";

import CollapsedQuestion from "../../components/collapsedquestion/CollapsedQuestion";
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
              {props.description && (
                <EditSubmission
                  question={props.description}
                  handleSubmit={props.editTAQuestion}
                />
              )}
              <LeaveQueueButton handleLeave={props.leaveTAQueue} />
            </Space>
          </Col>
        </Row>
      }
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {props.description ? (
          <Row>
            <Col span={12}>
              <h2 style={{ fontSize: 16, marginBottom: 8 }}>Your Question</h2>
              <CollapsedQuestion details={props.description} />
            </Col>
            <Col span={12} align="right">
              <WaitQueueStatMiniCards
                joinedAt={props.session && props.question.createdAt}
                queuePosition={queuePosition}
              />
            </Col>
          </Row>
        ) : (
          <WaitQueueStatMiniCards
            joinedAt={props.session && props.question.createdAt}
            queuePosition={queuePosition}
          />
        )}
      </Space>
    </Card>
  );
};

export default QueueStatus;

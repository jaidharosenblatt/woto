import React from "react";
import { Col, Card, Row, Space } from "antd";
import { ClockCircleOutlined, TeamOutlined } from "@ant-design/icons";

import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";

import EditSubmission from "../../components/buttons/EditSubmission";

import CollapsedQuestion from "../../components/collapsedquestion/CollapsedQuestion";
import { getOrdinalSuffix } from "../../utilfunctions/getOrdinalSuffix";

const QueueStatus = (props) => {
  const queuePosition = 2;

  return (
    <Card
      title={
        <Row align="middle">
          <Col span={12}>
            <h2>You are {getOrdinalSuffix(queuePosition)} in the Queue </h2>
          </Col>
          <Col span={12} align="right">
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
      <Space direction="vertical">
        {props.description ? (
          <CollapsedQuestion details={props.description} />
        ) : (
          <Space direction="vertical">
            <p>
              <Space align="center">
                <TeamOutlined />
                {`${getOrdinalSuffix(queuePosition)} out of 10 students`}
              </Space>
            </p>
            <p>
              <Space align="center">
                <ClockCircleOutlined />
                {` Expected wait time is ${queuePosition * 5} minutes`}
              </Space>
            </p>
          </Space>
        )}
      </Space>
    </Card>
  );
};

export default QueueStatus;

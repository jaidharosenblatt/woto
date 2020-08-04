import React from "react";
import { Col, Card, Row, Space } from "antd";

import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";

import WaitQueueStatMiniCards from "../../components/stat/WaitQueueStatMiniCards";
import { convertDateString } from "../../utilfunctions/timeAgo";
import LocationTimeTag from "../../components/header/LocationTimeTag";

const QueueStatus = (props) => {
  return (
    <div className="help-header">
      <Card
        title={
          <Row align="middle">
            <Col xs={24} md={14}>
              <Space direction="vertical" style={{ padding: "8px 0" }}>
                <h1>{props.course.code}'s Office Hours</h1>
                <LocationTimeTag
                  location={props.session.location}
                  time={`${convertDateString(
                    props.session.startTime
                  )} - ${convertDateString(props.session.endTime)}`}
                />
              </Space>
            </Col>
            <Col xs={0} md={10} align="right">
              <LeaveQueueButton handleLeave={props.leaveTAQueue} />
            </Col>
            <Col xs={24} md={0}>
              <LeaveQueueButton handleLeave={props.leaveTAQueue} />
            </Col>
          </Row>
        }
      >
        <WaitQueueStatMiniCards joinedAt={props.question.createdAt} />
      </Card>
    </div>
  );
};

export default QueueStatus;

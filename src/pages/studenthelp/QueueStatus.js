import React, { useContext } from "react";
import { Col, Card, Row, Space } from "antd";
import { HelpContext } from "./util/HelpContext";

import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";
import functions from "./util/functions";
import WaitQueueStatMiniCards from "../../components/stat/WaitQueueStatMiniCards";
import { convertDateString } from "../../utilfunctions/timeAgo";
import LocationTimeTag from "../../components/header/LocationTimeTag";

const QueueStatus = () => {
  const { state, dispatch } = useContext(HelpContext);

  const leaveTAQueue = () => functions.leaveTAQueue(state, dispatch);

  return (
    <div className="help-header">
      <Card
        title={
          <Row align="middle">
            <Col xs={24} md={14}>
              <Space direction="vertical" style={{ padding: "8px 0" }}>
                <h1>{state.course.code}'s Office Hours</h1>
                {state.session && (
                  <LocationTimeTag
                    location={state.session.location}
                    time={`${convertDateString(
                      state.session.startTime
                    )} - ${convertDateString(state.session.endTime)}`}
                  />
                )}
              </Space>
            </Col>
            <Col xs={0} md={10} align="right">
              <LeaveQueueButton handleLeave={leaveTAQueue} />
            </Col>
            <Col xs={24} md={0}>
              <LeaveQueueButton handleLeave={leaveTAQueue} />
            </Col>
          </Row>
        }
      >
        <WaitQueueStatMiniCards joinedAt={state.question.createdAt} />
      </Card>
    </div>
  );
};

export default QueueStatus;

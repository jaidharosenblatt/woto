import React, { useContext } from "react";
import { Card, Space } from "antd";
import { HelpContext } from "./util/HelpContext";

import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";
import functions from "./util/functions";
import WaitQueueStatMiniCards from "../../components/stat/WaitQueueStatMiniCards";
import { convertDateString } from "../../utilfunctions/timeAgo";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import LeftRightRow from "../../components/leftrightrow/LeftRightRow";

const QueueStatus = () => {
  const { state, dispatch } = useContext(HelpContext);

  const leaveTAQueue = () => functions.leaveTAQueue(state, dispatch);

  return (
    <div className="help-header">
      <Card
        title={
          <LeftRightRow
            left={
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
            }
            right={<LeaveQueueButton handleLeave={leaveTAQueue} />}
          />
        }
      >
        <WaitQueueStatMiniCards joinedAt={state.question.createdAt} />
      </Card>
    </div>
  );
};

export default QueueStatus;

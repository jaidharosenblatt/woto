import React, { useContext } from "react";
import { Card, Space } from "antd";
import { HelpContext } from "./util/HelpContext";

import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";
import functions from "./util/functions";
import WaitQueueStatMiniCards from "./WaitQueueStatMiniCards";
import { convertTimeString } from "../../utilfunctions/timeAgo";
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
              <Space direction="vertical">
                <h1>{state.course.code}'s Office Hours</h1>
                {state.session && (
                  <LocationTimeTag
                    location={state.session.location}
                    time={`${convertTimeString(
                      state.session.startTime
                    )} - ${convertTimeString(state.session.endTime)}`}
                  />
                )}
              </Space>
            }
            right={<LeaveQueueButton handleLeave={leaveTAQueue} />}
          />
        }
      >
        <WaitQueueStatMiniCards />
      </Card>
    </div>
  );
};

export default QueueStatus;

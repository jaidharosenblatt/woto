import React, { useContext, useState } from "react";
import { Card, Space, Button } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";
import Timer from "react-compound-timer";
import Avatars from "./discussioncard/Avatars";
import ParticipantQuestion from "./discussioncard/ParticipantQuestion";
import FormlessInput from "../../../components/form/FormlessInput";
import LeftRightRow from "../../../components/leftrightrow/LeftRightRow";
import HideWotoButton from "../../../components/buttons/HideWotoButton";
import LeaveWotoButton from "../../../components/buttons/LeaveWotoButton";

const WotoGroup = ({ isOwner, discussion }) => {
  const { state, dispatch } = useContext(HelpContext);

  const [selectedIndex, setSelectedIndex] = useState(0);

  //filter out inactive participants
  const participants = discussion.participants.filter((item) => item.active);

  const name = discussion?.owner?.name?.split(" ")[0];
  const roomName = discussion?.description?.roomName || `${name}'s Room`;

  const markAway = (user) => {
    console.log(user);
    functions.markAway(state, dispatch, user);
  };
  return (
    <Card
      loading={state.loading}
      className="discussion-card"
      title={
        <LeftRightRow
          left={
            <Space direction="vertical">
              {isOwner ? (
                <FormlessInput
                  defaultValue={roomName}
                  onSubmit={(value) =>
                    functions.editDiscussion(state, dispatch, {
                      roomName: value,
                    })
                  }
                />
              ) : (
                <h2>{roomName}</h2>
              )}

              <Timer
                formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
              >
                <p>
                  You've been working here for <Timer.Minutes />:
                  <Timer.Seconds
                    formatValue={(value) =>
                      `${value < 10 ? `0${value}` : value}`
                    }
                  />
                </p>
              </Timer>
            </Space>
          }
          right={
            <Space>
              <Button
                target="_blank"
                href={discussion.description?.meetingURL}
                type="primary"
              >
                Join Video Call
              </Button>

              {isOwner ? (
                <HideWotoButton
                  handleLeave={() =>
                    functions.archiveDiscussion(state, dispatch)
                  }
                />
              ) : (
                <LeaveWotoButton
                  handleLeave={() =>
                    functions.leaveDiscussion(state, dispatch, discussion)
                  }
                />
              )}
            </Space>
          }
        />
      }
    >
      <LeftRightRow
        left={
          <Avatars
            markAway={markAway}
            isOwner={isOwner}
            participants={participants}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        }
        right={
          participants?.length > 1 && (
            <ParticipantQuestion
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              discussion={discussion}
              highlightKeys={state.commonValues}
            />
          )
        }
      />
    </Card>
  );
};
export default WotoGroup;

import React, { useState } from "react";
import { Card, Space, Button } from "antd";
// import Timer from "react-compound-timer";
import Avatars from "./discussioncard/Avatars";
import ParticipantQuestion from "./discussioncard/ParticipantQuestion";
import FormlessInput from "../../components/form/FormlessInput";
import LeftRightRow from "../../components/leftrightrow/LeftRightRow";
import HideWotoButton from "../../components/modals/buttons/HideWotoButton";
import LeaveWotoButton from "../../components/modals/buttons/LeaveWotoButton";
import {
  closeDiscussion,
  leaveDiscussion,
} from "../../redux/courses/actions/wotos";
import { editSubmission } from "../../redux/courses/actions/student";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";

const WotoGroup = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { userID, loading, description, activeDiscussion } = props;

  const isOwner = activeDiscussion?.owner?._id === userID;
  //filter out inactive participants
  const participants = activeDiscussion?.participants.filter(
    (item) => item.active
  );

  const name = activeDiscussion?.owner?.name?.split(" ")[0];
  const roomName = activeDiscussion?.description?.roomName || `${name}'s Room`;

  return (
    <Card
      loading={loading}
      className="discussion-card"
      title={
        <LeftRightRow
          left={
            <Space direction="vertical">
              {isOwner ? (
                <FormlessInput
                  defaultValue={roomName}
                  onSubmit={(desc) => props.editDiscussion(desc)}
                />
              ) : (
                <h2>{roomName}</h2>
              )}
            </Space>
          }
          right={
            <Space>
              <Button
                target="_blank"
                href={description?.meetingURL}
                type="primary"
              >
                Join Video Call
              </Button>

              {isOwner ? (
                <HideWotoButton
                  handleLeave={() =>
                    props.closeDiscussion(activeDiscussion._id)
                  }
                />
              ) : (
                <LeaveWotoButton
                  handleLeave={() =>
                    props.leaveDiscussion(activeDiscussion._id)
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
            markAway={() => console.log("mark away")}
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
              discussion={activeDiscussion}
            />
          )
        }
      />
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    loading: selectors.getLoading(state),
    description: selectors.getDescription(state),
    activeDiscussion: selectors.getActiveDiscussion(state),
    userID: selectors.getUserID(state),
  };
};

export default connect(mapStateToProps, {
  editSubmission,
  closeDiscussion,
  leaveDiscussion,
})(WotoGroup);

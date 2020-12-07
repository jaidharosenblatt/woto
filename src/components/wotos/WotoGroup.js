import React, { useState } from "react";
import { Card, Space, Button } from "antd";
// import Timer from "react-compound-timer";
import Avatars from "./discussioncard/Avatars";
import ParticipantQuestion from "./discussioncard/ParticipantQuestion";
import FormlessInput from "../form/FormlessInput";
import LeftRightRow from "../util-components/leftrightrow/LeftRightRow";
import HideWotoButton from "../modals/buttons/HideWotoButton";
import LeaveWotoButton from "../modals/buttons/LeaveWotoButton";
import {
  closeDiscussion,
  leaveDiscussion,
} from "../../redux/courses/actions/wotos";
import { editSubmission } from "../../redux/courses/actions/student";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";
import EditSubmission from "../modals/buttons/EditSubmission";

const WotoGroup = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { userID, loading, activeDiscussion } = props;

  const isOwner = activeDiscussion?.owner?._id === userID;
  //filter out inactive participants
  const participants = activeDiscussion?.participants.filter(
    (item) => item.active
  );

  const name = activeDiscussion?.owner?.name?.split(" ")[0];
  const roomName = activeDiscussion?.description?.roomName || `${name}'s Room`;

  return (
    <Card loading={loading} className="discussion-card">
      <LeftRightRow
        left={
          <Space direction="vertical">
            {isOwner ? (
              <FormlessInput
                defaultValue={roomName}
                onSubmit={(desc) =>
                  props.editSubmission({
                    ...activeDiscussion.description,
                    roomName: desc,
                  })
                }
              />
            ) : (
              <h2>{roomName}</h2>
            )}
            <Space>
              <Button
                target="_blank"
                href={activeDiscussion?.description?.meetingURL}
                type="primary"
              >
                Join Video Call
              </Button>

              {isOwner ? (
                <>
                  <EditSubmission
                    question={activeDiscussion.description}
                    discussion={activeDiscussion}
                    handleSubmit={props.editSubmission}
                    button
                  />

                  <HideWotoButton
                    handleLeave={() =>
                      props.closeDiscussion(activeDiscussion._id)
                    }
                  />
                </>
              ) : (
                <LeaveWotoButton
                  handleLeave={() =>
                    props.leaveDiscussion(activeDiscussion._id)
                  }
                />
              )}
            </Space>
            <Avatars
              markAway={() => console.log("mark away")}
              isOwner={isOwner}
              participants={participants}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          </Space>
        }
        right={
          participants?.length !== 0 && (
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
    activeDiscussion: selectors.getActiveDiscussion(state),
    userID: selectors.getUserID(state),
  };
};

export default connect(mapStateToProps, {
  editSubmission,
  closeDiscussion,
  leaveDiscussion,
  editSubmission,
})(WotoGroup);

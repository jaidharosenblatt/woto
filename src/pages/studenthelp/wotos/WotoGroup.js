import React, { useContext, useState } from "react";
import { Card, Space, Button } from "antd";
// import Timer from "react-compound-timer";
import Avatars from "./discussioncard/Avatars";
import ParticipantQuestion from "./discussioncard/ParticipantQuestion";
import FormlessInput from "../../../components/form/FormlessInput";
import LeftRightRow from "../../../components/leftrightrow/LeftRightRow";
import HideWotoButton from "../../../components/buttons/HideWotoButton";
import LeaveWotoButton from "../../../components/buttons/LeaveWotoButton";
import actions from "../../../redux/courses/actionCreators";
import { connect } from "react-redux";
import { AuthContext } from "../../../contexts/AuthContext";
import selectors from "../../../redux/selectors";

const WotoGroup = (props) => {
  const courseID = props.course._id;
  const auth = useContext(AuthContext);
  const userID = auth.state.user._id;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { loading, description, activeDiscussion } = props;

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
                  onSubmit={(description) =>
                    props.editDiscussion(
                      courseID,
                      userID,
                      activeDiscussion._id,
                      description
                    )
                  }
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
                    props.closeDiscussion(
                      courseID,
                      userID,
                      activeDiscussion._id
                    )
                  }
                />
              ) : (
                <LeaveWotoButton
                  handleLeave={() =>
                    props.leaveDiscussion(
                      courseID,
                      userID,
                      activeDiscussion._id
                    )
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

const { editDiscussion, closeDiscussion, leaveDiscussion } = actions;

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    loading: selectors.getLoading(state),
    description: selectors.getDescription(state),
    activeDiscussion: selectors.getActiveDiscussion(state),
  };
};

export default connect(mapStateToProps, {
  editDiscussion,
  closeDiscussion,
  leaveDiscussion,
})(WotoGroup);

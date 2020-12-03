import React from "react";
import { List, Avatar } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { DefaultProfile } from "../../../../static/Images";
import { connect } from "react-redux";
import selectors from "../../../../redux/selectors";

const ParticipantsList = (props) => {
  const { discussion, discussionParticipant, userID, user } = props;
  const isHost = discussion ? true : false;

  const kickPerson = (person) => {
    // mark person as inactive
    console.log(person);
  };
  return (
    <List
      itemLayout="horizontal"
      dataSource={
        isHost ? discussion?.participants : discussionParticipant?.participants
      }
      renderItem={(item, index) => (
        <List.Item
          extra={
            discussion &&
            !userID === item.participant && (
              <CloseOutlined
                style={{ color: "red" }}
                onClick={() => kickPerson(item)}
              />
            )
          }
        >
          <List.Item.Meta
            title={
              userID === item.participant ? (
                <p style={{ paddingTop: "4px" }}>
                  {user.name.split(" ")[0]} (you)
                </p>
              ) : (
                <p style={{ paddingTop: "4px" }}>
                  {item.name
                    ? item.name.split(" ")[0]
                    : `Participant ${index + 1}`}
                </p>
              )
            }
            avatar={<Avatar src={item.avatar || DefaultProfile} />}
          />
        </List.Item>
      )}
    />
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    userID: selectors.getUserID(state),
    user: selectors.getUser(state),
  };
};
export default connect(mapStateToProps)(ParticipantsList);

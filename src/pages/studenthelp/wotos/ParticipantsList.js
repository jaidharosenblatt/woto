import React, { useContext } from "react";
import { List, Avatar } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { DefaultProfile } from "../../../static/Images";
import { AuthContext } from "../../../contexts/AuthContext";

const ParticipantsList = ({ discussion, discussionParticipant }) => {
  const isHost = discussion ? true : false;
  const { state } = useContext(AuthContext);

  const kickPerson = (person) => {
    // mark person as inactive
    console.log(person);
  };
  return (
    <List
      itemLayout="horizontal"
      dataSource={
        isHost ? discussion.participants : discussionParticipant.participants
      }
      renderItem={(item, index) => (
        <List.Item
          extra={
            discussion &&
            !state.user._id === item.participant && (
              <CloseOutlined
                style={{ color: "red" }}
                onClick={() => kickPerson(item)}
              />
            )
          }
        >
          <List.Item.Meta
            title={
              state.user._id === item.participant ? (
                <p style={{ paddingTop: "4px" }}>
                  {state.user.name.split(" ")[0]} (you)
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

export default ParticipantsList;

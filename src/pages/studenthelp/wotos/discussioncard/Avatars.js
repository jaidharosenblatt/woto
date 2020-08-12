import React, { useContext } from "react";
import { Space, Row, Avatar } from "antd";
import { DefaultProfile } from "../../../../static/Images";
import { AuthContext } from "../../../../contexts/AuthContext";
const COLORS = ["#40A9FF", "#FFB864", "#9254DE", "#FF4D50"];

const Avatars = ({ selectedIndex, setSelectedIndex, discussion }) => {
  const { state } = useContext(AuthContext);

  function getName(user, i) {
    if (user.name) {
      return user.name;
    }
    if (user.participant === state.user._id) {
      return "You";
    } else {
      return `Student ${i + 1}`;
    }
  }

  return (
    <Row className="avatars">
      {discussion.participants?.map((user, i) => {
        return (
          <Space key={i} align="center" direction="vertical">
            <div
              onClick={() => setSelectedIndex(i)}
              className="avatar-wrapper"
              style={{
                border: `1px solid ${COLORS[i % COLORS.length]}`,
              }}
            >
              <Avatar
                style={selectedIndex === i ? {} : { filter: "grayscale(100%)" }}
                src={DefaultProfile}
              />
            </div>
            <h3>{getName(user, i)}</h3>
          </Space>
        );
      })}
    </Row>
  );
};

export default Avatars;

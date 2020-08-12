import React, { useContext } from "react";
import { Space, Row, Avatar } from "antd";

import { DefaultProfile } from "../../../../static/Images";
import { AuthContext } from "../../../../contexts/AuthContext";
import MarkAwayBadge from "../../../../components/buttons/MarkAwayBadge";
const COLORS = ["#40A9FF", "#FFB864", "#9254DE", "#FF4D50"];

const Avatars = ({
  markAway,
  isOwner,
  selectedIndex,
  setSelectedIndex,
  discussion,
}) => {
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
              className="avatar-wrapper"
              style={{
                border: `1px solid ${COLORS[i % COLORS.length]}`,
              }}
            >
              <Avatar
                onClick={() => setSelectedIndex(i)}
                style={selectedIndex === i ? {} : { filter: "grayscale(100%)" }}
                src={DefaultProfile}
              />
            </div>
            <div style={{ display: "flex" }}>
              <h3>{getName(user, i)}</h3>
              {isOwner && user.participant !== state.user._id && (
                <MarkAwayBadge
                  markAway={() => markAway(user)}
                  name={getName(user, i)}
                />
              )}
            </div>
          </Space>
        );
      })}
    </Row>
  );
};

export default Avatars;

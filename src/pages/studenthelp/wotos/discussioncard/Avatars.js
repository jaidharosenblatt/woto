import React from "react";
import { Space, Row, Avatar } from "antd";
import { DefaultProfile } from "../../../../static/Images";

const COLORS = ["#40A9FF", "#FFB864", "#9254DE", "#FF4D50"];

const Avatars = ({ selectedIndex, setSelectedIndex, discussion }) => {
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
            <h3>{user.name || `Student ${i + 1}`}</h3>
          </Space>
        );
      })}
    </Row>
  );
};

export default Avatars;

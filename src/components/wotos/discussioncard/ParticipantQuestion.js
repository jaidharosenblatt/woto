import React from "react";
import { Space, Avatar } from "antd";

import { ArrowRightOutlined } from "@ant-design/icons";
import CollapsedQuestion from "../../course/collapsedquestion/CollapsedQuestion";

const ParticipantQuestion = ({
  selectedIndex,
  setSelectedIndex,
  discussion,
  highlightKeys,
}) => {
  const participant = discussion.participants[selectedIndex];
  return (
    <Space
      direction="vertical"
      style={{ alignItems: "baseline" }}
      className="title"
    >
      <Space>
        <p style={{ fontSize: 16 }}>{participant?.name}'s Question</p>
        {discussion.participants.length > 1 && (
          <Avatar
            size="small"
            type="primary"
            onClick={() =>
              setSelectedIndex(
                (selectedIndex + 1) % discussion.participants.length
              )
            }
          >
            <ArrowRightOutlined />
          </Avatar>
        )}
      </Space>
      <CollapsedQuestion
        words
        name={participant?.name}
        details={participant?.question}
        highlightKeys={highlightKeys}
      />
    </Space>
  );
};

export default ParticipantQuestion;

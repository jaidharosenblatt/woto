import React from "react";
import { Space, Avatar } from "antd";

import { ArrowRightOutlined } from "@ant-design/icons";
import CollapsedQuestion from "../../../../components/collapsedquestion/CollapsedQuestion";

const ParticipantQuestion = ({
  selectedIndex,
  setSelectedIndex,
  discussion,
  highlightKeys,
}) => {
  return (
    <Space direction="vertical" className="title">
      <Space align="center">
        <p style={{ fontSize: 16 }}>
          {discussion.participants[selectedIndex]?.name ||
            `Student ${selectedIndex + 1}'s Question`}
        </p>
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
      </Space>
      <CollapsedQuestion
        words
        details={discussion.description}
        highlightKeys={highlightKeys}
      />
    </Space>
  );
};

export default ParticipantQuestion;

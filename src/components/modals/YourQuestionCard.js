import React from "react";

import { Space, Card, Row, Avatar, Badge } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CollapsedQuestion from "../collapsedquestion/CollapsedQuestion";

const styles = {
  editIcon: {
    color: "#40A9FF",
    backgroundColor: "#91D5FF",
    marginLeft: "20px",
  },
};

const EditIcon = (
  <Link to="/modal">
    <Avatar size="small" style={styles.editIcon}>
      <EditOutlined />
    </Avatar>
  </Link>
);

const YourQuestionCard = ({ details }) => {
  return (
    <Card>
      <Space direction="vertical">
        <Row align="middle">
          <Badge count={EditIcon}>
            <h2>Your Question</h2>
          </Badge>
        </Row>
        <CollapsedQuestion details={details} />
      </Space>
    </Card>
  );
};

export default YourQuestionCard;

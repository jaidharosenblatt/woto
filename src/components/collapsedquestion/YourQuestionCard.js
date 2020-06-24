import React from "react";

import { Space, Card, Row, Avatar, Badge } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CollapsedQuestion from "./CollapsedQuestion";
import Popup from "../modals/tools/Popup";
import YourQuestionModal from "../modals/YourQuestionModal";

const styles = {
  editIcon: {
    color: "#40A9FF",
    backgroundColor: "#91D5FF",
  },
};

const YourQuestionCard = ({ details }) => {
  return (
    <Card
      title={
        <Row align="middle">
          <Space>
            <h2>Your Question</h2>
            <Popup
              element={
                <Avatar size="small" style={styles.editIcon}>
                  <EditOutlined />
                </Avatar>
              }
              modal={YourQuestionModal}
            />
          </Space>
        </Row>
      }
    >
      <Space direction="vertical">
        <CollapsedQuestion details={details} />
      </Space>
    </Card>
  );
};

export default YourQuestionCard;

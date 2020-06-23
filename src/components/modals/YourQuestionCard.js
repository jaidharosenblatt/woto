import React from "react";

import { Space, Col, Row, Avatar, Badge } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import {
  GrayClipboardIcon,
  GrayPageIcon,
  GrayLinesIcon,
  GrayQuestionMarkIcon,
} from "./tools/Icons";

const styles = {
  editIcon: {
    color: "#40A9FF",
    backgroundColor: "#91D5FF",
    marginLeft: "30px",
  },
};

const EditIcon = (
  <Link to="/modal">
    <Avatar size="small" style={styles.editIcon}>
      <EditOutlined />
    </Avatar>
  </Link>
);

const YourQuestionCard = () => {
  return (
    <Col align="left">
      <Space direction="vertical">
        <Row align="middle">
          <Badge count={EditIcon}>
            <h2>Your Question</h2>
          </Badge>
        </Row>

        <Row>
          <GrayClipboardIcon />
          <h3>Assignment 3</h3>
        </Row>

        <Row>
          <GrayPageIcon />
          <p>Problem 1</p>
        </Row>

        <Row>
          <GrayLinesIcon />
          <p>Just getting started</p>
        </Row>

        <Row>
          <GrayQuestionMarkIcon />
          <p>Don't know what a linked list is</p>
        </Row>
      </Space>
    </Col>
  );
};

export default YourQuestionCard;

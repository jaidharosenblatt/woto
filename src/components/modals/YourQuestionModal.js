import React from "react";
import { Avatar, Form, Col, Row, Button, Space } from "antd";
import "./modals.css";
import HelpForm from "../../pages/studenthelp/form/HelpForm";
import { EditOutlined } from "@ant-design/icons";

const styles = {
  editIcon: {
    color: "#40A9FF",
    backgroundColor: "#91D5FF",
  },
};

// const initialValues = {
//   assignment: "hw1",
//   collaborate: true,
//   concepts: ["Dynamic Programming"],
//   isAssignment: true,
//   meetingUrl: "duke.zoom.us/1234567890",
//   problem: "Problem 3b",
//   question: "Learning ",
//   stage: "improvingSolution",
// };

const YourQuestionModal = ({ handleCancel }) => {
  return (
    <Space direction="vertical">
      <Row align="middle" style={{ width: "100%" }}>
        <Col span={3}>
          <Avatar size="medium" style={styles.editIcon}>
            <EditOutlined />
          </Avatar>
        </Col>
        <Col span={12}>
          <h1>Your Question</h1>
        </Col>
        <Col span={9} align="right">
          <Button type="primary" danger>
            Leave Queue
          </Button>
        </Col>
      </Row>
      <Row>
        <HelpForm
          button={
            <Row gutter={4}>
              <Col span={12}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Edit
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button block onClick={handleCancel}>
                  Cancel
                </Button>
              </Col>
            </Row>
          }
        />
      </Row>
    </Space>
  );
};

export default YourQuestionModal;

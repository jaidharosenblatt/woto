import React, { useContext } from "react";
import { Avatar, Form, Col, Row, Button, Space } from "antd";
import "./modals.css";
import HelpForm from "../../pages/studenthelp/form/HelpForm";
import { EditOutlined } from "@ant-design/icons";
import { HelpContext } from "../../contexts/HelpContext";

const styles = {
  editIcon: {
    color: "#40A9FF",
    backgroundColor: "#91D5FF",
  },
};

/**
 * Allow user to leave the queue or edit their question
 * @param hideModal action inherited from popup that allows modal be be hidden
 */
const YourQuestionModal = ({ hideModal }) => {
  const { state, dispatch } = useContext(HelpContext);
  const handleLeave = () => {
    dispatch({
      type: "END",
    });
  };

  const handleEdit = (values) => {
    dispatch({
      type: "EDIT",
      payload: { question: { ...values } },
    });
  };

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
          <Button type="primary" danger onClick={handleLeave}>
            Leave Queue
          </Button>
        </Col>
      </Row>
      <Row>
        <HelpForm
          onFormSubmit={handleEdit}
          initialValues={state.question}
          button={
            <Row gutter={4}>
              <Col span={12}>
                <Form.Item>
                  <Button
                    onClick={hideModal}
                    type="primary"
                    htmlType="submit"
                    block
                  >
                    Edit
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button block onClick={hideModal}>
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

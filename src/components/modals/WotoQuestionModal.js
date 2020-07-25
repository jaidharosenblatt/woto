import React from "react";
import { Button, Space, Row, Col } from "antd";
import "./modals.css";
import SubmitButton from "../form/SubmitButton";
import VideoRoomUrl from "../form/VideoRoomUrl";
import AdjustableQuestion from "../helpform/AdjustableQuestion";
/**
 * @jaidharosenblatt
 * Modal that prompts a user edit an existing question
 * @param hideModal callback function for cancel
 * @param handleEdit callback function for remove
 * @param question form to edit
 */
const WotoQuestionModal = (props) => {
  return (
    <div className="modal-wrapper">
      <Col span={24}>
        <Space direction="vertical" style={{ width: "100%" }}>
          {props.edit ? (
            <Row gutter={4} align="middle">
              <Col span={12}>
                <h2>Edit My Submission</h2>
              </Col>
              <Col span={12} align="right">
                <Button
                  danger
                  onClick={() => {
                    props.handleEdit({ archived: true });
                    props.hideModal();
                  }}
                >
                  Archive
                </Button>
              </Col>
            </Row>
          ) : (
            <>
              <h2>Edit My Submission</h2>
              <p>
                Submit this form to show what you're working on to your
                classmates
              </p>
            </>
          )}

          <AdjustableQuestion
            initialValues={props.question}
            extraFields={<VideoRoomUrl />}
            onFormSubmit={(values) => {
              props.handleEdit({ description: { ...values } });
              props.hideModal();
            }}
            buttons={
              <Row gutter={4}>
                <Col span={12}>
                  <SubmitButton CTA="Submit" />
                </Col>
                <Col span={12}>
                  <Button block onClick={props.hideModal}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            }
          />
        </Space>
      </Col>
    </div>
  );
};

export default WotoQuestionModal;

import React from "react";
import { Button, Space, Row, Col } from "antd";
import "./modals.css";
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
                    props.handleSubmit({ archived: true });
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
              props.handleSubmit({ description: { ...values } });
              props.hideModal();
            }}
            secondaryCTA="Cancel"
            onSecondaryClick={props.hideModal}
          />
        </Space>
      </Col>
    </div>
  );
};

export default WotoQuestionModal;

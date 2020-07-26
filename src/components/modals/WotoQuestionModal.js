import React from "react";
import { Button, Space, Row, Col } from "antd";
import "./modals.css";
import VideoRoomUrl from "../form/VideoRoomUrl";
import AdjustableQuestion from "../helpform/AdjustableQuestion";
/**
 * @jaidharosenblatt
 * Modal that prompts a user edit an existing question
 * @param hideModal callback function for cancel
 * @param handleSubmit callback function for submitting form
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
              {props.archive && (
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
              )}
            </Row>
          ) : (
            <div>
              <h2>I'm Working On</h2>
              <p>
                Submit this form to show what you're working on to your peers
              </p>
            </div>
          )}

          <AdjustableQuestion
            initialValues={props.question}
            extraFields={props.videoRoom && <VideoRoomUrl />}
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

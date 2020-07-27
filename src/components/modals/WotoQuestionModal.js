import React from "react";
import { Space, Col } from "antd";
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
            <h2>Edit My Submission</h2>
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
              props.handleSubmit(values);
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

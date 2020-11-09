import React from "react";
import { Space, Col } from "antd";
import "./modals.css";
import VideoRoomUrl from "../form/VideoRoomUrl";
import AdjustableQuestion from "../helpform/AdjustableQuestion";
import RoomName from "../form/RoomName";
/**
 * @jaidharosenblatt
 * Modal that prompts a user edit an existing question
 * @param hideModal callback function for cancel
 * @param handleSubmit callback function for submitting form
 * @param question form to edit
 * @param discussion if there is an existing discussion
 */
const WotoQuestionModal = (props) => {
  return (
    <div className="modal-wrapper-large">
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
            questionForm={props.questionTemplate}
            initialValues={props.question}
            extraFields={
              props.discussion && (
                <>
                  <VideoRoomUrl noDefault={props.question} required />
                  <RoomName noDefault={props.question} required />
                </>
              )
            }
            onFormSubmit={(values) => {
              props.hideModal();
              props.handleSubmit(values);
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

import React from "react";
import { Button, Space, Row, Col } from "antd";
import "./modals.css";
import SubmitButton from "../form/SubmitButton";
import AdjustableQuestion from "../helpform/AdjustableQuestion";
/**
 * @jaidharosenblatt
 * Modal that prompts a user edit an existing question
 * @param hideModal callback function for cancel
 * @param handleEdit callback function for remove
 * @param question form to edit
 */
const EditSubmissionModal = (props) => {
  return (
    <div className="modal-wrapper">
      <Col span={24}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <h2>Edit My Submission</h2>
          <AdjustableQuestion
            initialValues={props.question}
            onFormSubmit={(values) => {
              props.handleEdit(values);
              props.hideModal();
            }}
            buttons={
              <Row gutter={4}>
                <Col span={12}>
                  <SubmitButton CTA="Edit" />
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

export default EditSubmissionModal;

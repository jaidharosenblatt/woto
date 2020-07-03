import React, { useContext } from "react";
import { Row, Col, Card } from "antd";
import HelpForm from "./HelpForm";
import LeaveQueueButton from "../../../components/buttons/LeaveQueueButton";
import { HelpContext } from "../../../contexts/HelpContext";

/**
 * Edit your question using exisitng values from
 * a context state and edit dispatch to handle edit
 */
const EditQuestionForm = () => {
  const { state, dispatch } = useContext(HelpContext);

  const handleEdit = (values) => {
    dispatch({
      type: "EDIT",
      payload: { question: { ...values } },
    });
  };

  return (
    <Card
      title={
        <Row align="middle">
          <Col span={12}>
            <h2>Edit Your Question</h2>
          </Col>
          <Col span={12} align="right">
            <LeaveQueueButton />
          </Col>
        </Row>
      }
    >
      <HelpForm
        initialValues={state.question}
        CTA="Edit Your Question"
        onFormSubmit={handleEdit}
      />
    </Card>
  );
};

export default EditQuestionForm;

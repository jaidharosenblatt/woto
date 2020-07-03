import React, { useContext } from "react";
import { Row, Col, Card } from "antd";

import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import HelpForm from "./form/HelpForm";
import MainColabComp from "../../components/Tables/StudentCollaborate/MainColabComp";
import { HelpContext } from "../../contexts/HelpContext";
import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";

const WotoRoom = () => {
  const { state, dispatch } = useContext(HelpContext);

  const questionSubmitted = false;

  const handleEdit = (values) => {
    dispatch({
      type: "EDIT",
      payload: { question: { ...values } },
    });
  };

  return (
    <Row align="center">
      <Col span={24}>
        <MainColabComp />
      </Col>
      <Col span={24}>
        <Row>
          <Col xs={24} md={12}>
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
          </Col>
          <Col xs={24} md={12}>
            <WaitQueueStatCards />
            <TeachingStaffCard active />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default WotoRoom;

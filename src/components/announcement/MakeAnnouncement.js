import React from "react";
import { Card, Row, Col, Form } from "antd";
import TextInput from "../form/TextInput";
import SubmitButton from "../form/SubmitButton";
import "./announcement.css";

const onFormSubmit = (e) => {
  console.log(e);
};
const onFinishFailed = (e) => {
  console.log(e);
};

const MakeAnnouncement = () => {
  return (
    <Card className="announcement">
      <Form onFinish={onFormSubmit} onFinishFailed={onFinishFailed}>
        <Row gutter={4}>
          <Col align="center" xs={12} md={16}>
            <TextInput
              name="announcement"
              placeholder="...There is a mistake in problem 3"
            />
          </Col>
          <Col align="center" xs={12} md={8}>
            <SubmitButton CTA="Make Announcement" />
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default MakeAnnouncement;

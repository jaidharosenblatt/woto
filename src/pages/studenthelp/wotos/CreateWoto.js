import React from "react";
import { Form, Card, Button } from "antd";
import VideoRoomUrl from "../../../components/form/VideoRoomUrl";

const CreateWoto = (props) => {
  const firstValue = props.description[Object.keys(props.description)[0]];
  return (
    <Card
      headStyle={{ padding: "14px 16px" }}
      title={<h2>Create a Woto Room</h2>}
    >
      <Form onFinish={props.postDiscussion} layout="vertical">
        <Form.Item>
          <p>
            Share your information so you can collaborate with others. There are{" "}
            <strong>
              8 other students who submitted questions on {firstValue}
            </strong>
          </p>
        </Form.Item>
        <VideoRoomUrl />
        <Button type="primary" block htmlType="submit">
          Collaborate Now
        </Button>
      </Form>
    </Card>
  );
};

export default CreateWoto;

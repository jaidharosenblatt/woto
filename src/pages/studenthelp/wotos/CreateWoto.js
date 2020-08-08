import React, { useContext } from "react";
import { Form, Card, Button, Input } from "antd";
import VideoRoomUrl from "../../../components/form/VideoRoomUrl";
import { AuthContext } from "../../../contexts/AuthContext";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";

const CreateWoto = () => {
  const { state, dispatch } = useContext(HelpContext);

  const authContext = useContext(AuthContext);
  const defaultName = `${authContext.state.user.name &&
    authContext.state.user.name.split(" ")[0]}'s Room`;
  const firstValue =
    state.description && state.description[Object.keys(state.description)[0]];
  return (
    <Card
      headStyle={{ padding: "14px 16px" }}
      title={<h2>Create a Woto Room</h2>}
    >
      <Form
        onFinish={(values) => functions.postDiscussion(state, dispatch, values)}
        layout="vertical"
      >
        <Form.Item>
          <p>
            Share your information so you can collaborate with others. There are{" "}
            <strong>
              8 other students who submitted questions on {firstValue}
            </strong>
          </p>
        </Form.Item>
        <Form.Item label="Room Name" initialValue={defaultName} name="roomName">
          <Input />
        </Form.Item>
        <VideoRoomUrl />
        <Button loading={state.loading} type="primary" block htmlType="submit">
          Collaborate Now
        </Button>
      </Form>
    </Card>
  );
};

export default CreateWoto;

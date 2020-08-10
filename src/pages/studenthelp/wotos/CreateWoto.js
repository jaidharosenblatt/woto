import React, { useContext } from "react";
import { Form, Card, Button } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";
import RoomName from "../../../components/form/RoomName";
import VideoRoomUrl from "../../../components/form/VideoRoomUrl";

const CreateWoto = () => {
  const { state, dispatch } = useContext(HelpContext);

  const firstValue =
    state.description && state.description[Object.keys(state.description)[0]];
  return (
    <Card
      loading={state.loading}
      headStyle={{ padding: "14px 16px" }}
      title={!state.loading && <h2>Create a Woto Room</h2>}
    >
      <Form
        onFinish={(values) => functions.postDiscussion(state, dispatch, values)}
        layout="vertical"
      >
        <Form.Item>
          <p>
            While you wait for your turn with the TA, try collaborating with
            your peers. There are{" "}
            <strong>
              3 other students who submitted questions on {firstValue}
            </strong>
            . Share a meeting room url to begin collaborating!
          </p>
        </Form.Item>

        <RoomName required />
        <VideoRoomUrl required />
        <Button loading={state.loading} type="primary" block htmlType="submit">
          Create Room
        </Button>
      </Form>
    </Card>
  );
};

export default CreateWoto;

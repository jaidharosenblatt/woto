import React, { useContext } from "react";
import { Form, Card, Button, Col, Row } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";
import RoomName from "../../../components/form/RoomName";
import VideoRoomUrl from "../../../components/form/VideoRoomUrl";
import { getOrList } from "../../../utilfunctions/getOrList";

const CreateWoto = ({ handleCreate, studentCount, handleCancel, label }) => {
  const { state, dispatch } = useContext(HelpContext);

  const handleSubmit = (values) => {
    handleCreate();
    functions.postDiscussion(state, dispatch, values);
  };
  const firstValue =
    state.description && state.description[Object.keys(state.description)[0]];

  const filterValue = getOrList(firstValue);

  return (
    <Card
      loading={state.loading}
      headStyle={{ padding: "14px 16px" }}
      title={!state.loading && <h2>Create a Woto Room</h2>}
    >
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item>
          <p>
            While you wait for your turn with the TA, try collaborating with
            your peers.
            {studentCount > 0 && studentCount > 1 ? (
              <strong>
                There are {studentCount} other students who submitted questions
                on {filterValue}
              </strong>
            ) : (
              <strong>
                There is another student who submitted a question on{" "}
                {filterValue}
              </strong>
            )}
            . Share a meeting room url to begin collaborating!
          </p>
        </Form.Item>

        <RoomName required />
        <VideoRoomUrl required />
        {handleCancel ? (
          <Row gutter={4}>
            <Col span={12}>
              <Button
                loading={state.loading}
                type="primary"
                block
                htmlType="submit"
              >
                Create Room
              </Button>
            </Col>
            <Col span={12}>
              <Button block loading={state.loading} onClick={handleCancel}>
                {label || "Cancel"}
              </Button>
            </Col>
          </Row>
        ) : (
          <Button
            loading={state.loading}
            type="primary"
            block
            htmlType="submit"
          >
            Create Room
          </Button>
        )}
      </Form>
    </Card>
  );
};

export default CreateWoto;

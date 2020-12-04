import React from "react";
import { Form, Card, Button, Col, Row } from "antd";
import RoomName from "../../components/form/RoomName";
import VideoRoomUrl from "../../components/form/VideoRoomUrl";
import util from "../../util";
import { postDiscussion } from "../../../redux/courses/actions/wotos";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";

const CreateWoto = (props) => {
  const { loading, description, activeQuestion } = props;

  const handleSubmit = (values) => {
    const discussionDescription = {
      ...activeQuestion.description,
      ...values,
    };
    props.postDiscussion(discussionDescription, values.meetingURL);
  };
  const firstValue = description && description[Object.keys(description)[0]];
  const filterValue = util.getOrList(firstValue);

  return (
    <Card loading={loading} title={!loading && <h2>Create a Woto Room</h2>}>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item>
          <p>
            While you wait for your turn with the TA, try collaborating with
            your peers.
            {props.studentCount > 1 ? (
              <strong>
                There are {props.studentCount} other students who submitted
                questions on {filterValue}
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
        {props.handleCancel ? (
          <Row gutter={4}>
            <Col span={12}>
              <Button loading={loading} type="primary" block htmlType="submit">
                Create Room
              </Button>
            </Col>
            <Col span={12}>
              <Button block loading={loading} onClick={props.handleCancel}>
                {props.label || "Cancel"}
              </Button>
            </Col>
          </Row>
        ) : (
          <Button loading={loading} type="primary" block htmlType="submit">
            Create Room
          </Button>
        )}
      </Form>
    </Card>
  );
};

const mapStateToProps = (state, pastProps) => {
  return {
    ...pastProps,
    course: selectors.getCourse(state),
    loading: selectors.getLoading(state),
    description: selectors.getDescription(state),
    activeQuestion: selectors.getActiveQuestion(state),
  };
};
export default connect(mapStateToProps, { postDiscussion })(CreateWoto);

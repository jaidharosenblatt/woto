import React from "react";
import { Row, Col, Space } from "antd";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";
import AddWotoButton from "../../buttons/AddWotoButton";

/**
 * Render header of a collab table
 * @param {props} questionNotArchived boolean of if you have an active question
 * @param {props} loading collab table loading
 * @param {props} loadData refresh rable
 * @param {props} courseCode ex CS201
 * @param {props} queueTime time to be seen
 * @param {props} currentQuestion details about active question
 * @param {props} handleSubmit handle submit of a new woto
 * @param {props} questionTemplate passed to pass down to woto modal
 */
const CollabTableHeader = (props) => {
  return (
    <Row align="middle" gutter={[8, 8]}>
      <Col xs={24} md={props.questionNotArchived ? 24 : 18}>
        <Space direction="vertical">
          <h2>
            Woto Rooms{" "}
            {props.loading ? (
              <LoadingOutlined />
            ) : (
              <ReloadOutlined onClick={props.loadData} />
            )}
          </h2>
          <p>
            {props.queueTime
              ? `You still have ${props.queueTime} minutes until a TA can see you. Try working with your classmates while you wait!`
              : "Create or join a Woto Room to begin video conferencing with your peers."}
          </p>
        </Space>
      </Col>

      <Col xs={0} md={props.questionNotArchived ? 0 : 6} align="right">
        <AddWotoButton
          videoRoom
          question={props.currentQuestion}
          handleSubmit={props.handleSubmit}
          CTA={`Join ${props.courseCode}'s Woto Room`}
          questionTemplate={props.questionTemplate}
        />
      </Col>
      <Col xs={props.questionNotArchived ? 0 : 24} md={0} align="left">
        <AddWotoButton
          question={props.currentQuestion}
          handleSubmit={props.handleSubmit}
          CTA={`Join ${props.courseCode}'s Woto Room`}
          questionTemplate={props.questionTemplate}
        />
      </Col>
    </Row>
  );
};

export default CollabTableHeader;

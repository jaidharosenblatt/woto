import React from "react";
import { Row, Col, Space } from "antd";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";

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
            {props.courseCode}'s Woto Rooms{" "}
            {props.loading ? (
              <LoadingOutlined />
            ) : (
              <ReloadOutlined onClick={props.loadData} />
            )}
          </h2>
        </Space>
      </Col>
    </Row>
  );
};

export default CollabTableHeader;

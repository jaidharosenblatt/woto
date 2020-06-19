import React from "react";
import { Button, Space, Row, Col } from "antd";
import { Bell } from "../../static/Images";

const ClearQueueModal = (props) => {
  const queueSize = props.queueSize === undefined ? 0 : props.queueSize;
  return (
    <Col align="middle">
      <Space direction="vertical">
        <img style={{ width: 40 }} src={Bell} alt="active" />
        <h1 style={{ width: 200 }}>Clear Queue</h1>
        <p> {`There are ${queueSize} students in the queue`}</p>
        <Row gutter={4}>
          <Col span={12}>
            <Button onClick={props.handleCancel} block>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button block type="danger">
              Clear Queue
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default ClearQueueModal;

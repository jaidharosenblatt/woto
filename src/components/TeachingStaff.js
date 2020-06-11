import React from "react";
import { Avatar, Card, Tag, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

//component should be passed an avatar, title, status, and taType prop
/**
 * @kadenrosenblatt used to render an entry in a TA list
 * @param {avatar} props the avatar passed in
 * @param {title} props the title passed in
 * @param {status} props the status passed in
 * @param {taType} props the ta type passed in
 */

const RenderStatus = (status) => {
  switch (status) {
    case "Active":
      return <Tag color="blue">Active</Tag>;
    default:
      return <Tag color="default">Helping Student</Tag>;
  }
};

const RenderTaType = (taType) => {
  switch (taType) {
    case "Grad":
      return <Tag color="default">Grad</Tag>;
    default:
      return <Tag color="default">UTA</Tag>;
  }
};

const TeachingStaff = (props) => {
  return (
    <Card size="small">
      <Row align="middle" gutter={8}>
        <Col>
          <Avatar icon={<UserOutlined />} />
        </Col>
        <Col span={10}>
          <p style={{ marginBottom: 0 }}>{props.title}</p>
        </Col>
        <Col span={10} align="right">
          {RenderStatus(props.status)}
          {RenderTaType(props.taType)}
        </Col>
      </Row>
    </Card>
  );
};

export default TeachingStaff;

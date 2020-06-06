import React from "react";
import { Avatar, Card, Tag, Row, Col } from "antd";
import "./TeachingStaff.css";
import { UserOutlined } from "@ant-design/icons";

//component should be passed an avatar, title, status, and taType prop
/**
 * @param {avatar} props the avatar passed in
 * @param {title} props the title passed in
 * @param {status} props the status passed in
 * @param {taType} props the ta type passed in
 */

const RenderStatus = (status) => {
  switch (status) {
    case "Active":
      return <Tag color="blue">Active</Tag>;
    case "Busy":
      return <Tag color="default">Helping Student</Tag>;
  }
};

const RenderTaType = (taType) => {
  switch (taType) {
    case "Grad":
      return <Tag color="default">Grad</Tag>;
    case "Uta":
      return <Tag color="default">UTA</Tag>;
  }
};

const TeachingStaff = (props) => {
  return (
    <Card size="small">
      <Row>
        <Col span={2}>
          <Avatar icon={<UserOutlined />} />
        </Col>
        <Col span={10}>
          <p className="Title">{props.title}</p>
        </Col>
        <Col span={12}>
          <div className="ListItem">
            <div className="Tag">
              {RenderStatus(props.status)}
              {RenderTaType(props.taType)}
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default TeachingStaff;

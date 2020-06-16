import React from "react";
import { Avatar, Card, Tag, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

/**
 * @kadenrosenblatt & @jaidharosenblatt used to render an entry in a TA list
 * @param {avatar} props the avatar passed in
 * @param {title} props the title passed in
 * @param {status} props the status passed in
 * @param {taType} props the ta type passed in
 */

const styles = {
  profilePic: {
    width: "30px",
    borderRadius: "20px",
    margin: "4px 8px",
  },
  textContainer: { marginLeft: "auto", marginRight: 0 },
  card: { marginBottom: "4px" },
};

//Choose color based on tag text
const RenderTag = (tag) => {
  switch (tag) {
    case "Active":
      return <Tag color="blue">{tag}</Tag>;
    case "Helping Student":
      return <Tag color="blue">{tag}</Tag>;
    default:
      return <Tag color="default">{tag}</Tag>;
  }
};

const TeachingStaff = (props) => {
  return (
    <Card size="small" style={styles.card}>
      <Row align="middle">
        <img src={props.profilePic} style={styles.profilePic} />
        <p>{props.title}</p>
        <div style={styles.textContainer}>
          {RenderTag(props.status)}
          {RenderTag(props.taType)}
        </div>
      </Row>
    </Card>
  );
};

export default TeachingStaff;

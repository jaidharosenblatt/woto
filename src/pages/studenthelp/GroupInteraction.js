import React from "react";
import { Row, Col, Card, Space, List, Avatar } from "antd";
import CollapsedQuestion from "../../components/collapsedquestion/CollapsedQuestion";
import { CloseOutlined } from "@ant-design/icons";
import { DefaultProfile } from "../../static/Images";

const participants = [
  {
    name: "Jaidha",
    avatar: DefaultProfile,
  },
  {
    name: "Kaden",
    avatar: DefaultProfile,
  },
  {
    name: "Matthew",
    avatar: DefaultProfile,
  },

  {
    name: "Matthew",
    avatar: DefaultProfile,
  },
];

const GroupInteraction = ({ course, question, discussion }) => {
  console.log(question);
  console.log(discussion);

  const kickPerson = (item) => {
    console.log(item);
  };

  return (
    <Card
      title={`${discussion.name}'s Woto Room`}
      headStyle={{ backgroundColor: "#40a9ff", color: "white" }}
    >
      <Row gutter={[50, 0]}>
        <Col xs={24} md={12} lg={5}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <h2 style={{ fontSize: "16px" }}>Participants</h2>
            <List
              itemLayout="horizontal"
              //grid={{}}
              dataSource={participants}
              renderItem={(item) => (
                <List.Item
                  extra={<CloseOutlined onClick={() => kickPerson(item)} />}
                >
                  <List.Item.Meta
                    title={<p style={{ paddingTop: "4px" }}>{item.name}</p>}
                    avatar={<Avatar src={item.avatar} />}
                  />
                </List.Item>
              )}
            />
          </Space>
        </Col>
        <Col xs={12} md={6} lg={9}>
          <p>{discussion.name}'s Question</p>
          <CollapsedQuestion details={discussion.description} />
        </Col>
        <Col xs={12} md={6} lg={10}>
          <p>Your Question</p>
          <CollapsedQuestion details={discussion.description} />
        </Col>
      </Row>
    </Card>
  );
};

export default GroupInteraction;

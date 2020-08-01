import React from "react";
import { Row, Col, Card, Space, List, Avatar } from "antd";
import CollapsedQuestion from "../../components/collapsedquestion/CollapsedQuestion";
import { CloseOutlined } from "@ant-design/icons";
import { DefaultProfile } from "../../static/Images";
import Timer from "react-compound-timer";
import "./Help.css";

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
];

const GroupInteraction = ({ course, question, discussion }) => {
  console.log(question);
  console.log(discussion);

  const kickPerson = (item) => {
    console.log(item);
  };

  return (
    <Card
      title={
        <Row>
          <Col xs={9} lg={16}>
            <b>{discussion.name}'s Woto Room</b>
          </Col>
          <Col xs={15} lg={8} align="right">
            <Timer
              formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
            >
              <h2 style={{ fontSize: "16px", color: "white" }}>
                {" "}
                You've been working here for <Timer.Minutes />:
                <Timer.Seconds
                  formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
                />
              </h2>
            </Timer>
          </Col>
        </Row>
      }
      headStyle={{ backgroundColor: "#40a9ff", color: "white" }}
    >
      <Row gutter={[50, 0]}>
        <Col xs={24} lg={15}>
          <CollapsedQuestion
            name={discussion.name}
            details={discussion.description}
            details2={discussion.description}
          />
        </Col>
        <Col xs={24} lg={9}>
          <Space
            className="group-interaction"
            direction="vertical"
            style={{ width: "100%" }}
          >
            <h2 style={{ fontSize: "16px" }}>Participants</h2>
            <List
              itemLayout="horizontal"
              dataSource={participants}
              renderItem={(item) => (
                <List.Item
                  extra={
                    <CloseOutlined
                      style={{ color: "red" }}
                      onClick={() => kickPerson(item)}
                    />
                  }
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
      </Row>
    </Card>
  );
};

export default GroupInteraction;

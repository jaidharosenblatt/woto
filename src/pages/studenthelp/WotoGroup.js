import React from "react";
import { Row, Col, Card, Space, List, Avatar } from "antd";
import CollapsedQuestion from "../../components/collapsedquestion/CollapsedQuestion";
import Timer from "react-compound-timer";
import { CloseOutlined } from "@ant-design/icons";
import { DefaultProfile } from "../../static/Images";

const WotoGroup = (props) => {
  const kickPerson = (person) => {
    // mark person as inactive
    console.log(person);
  };
  return (
    <Card
      title={
        <Row>
          <Col xs={9} md={14}>
            <h2>{props.discussionParticipant.name}'s Woto Room`</h2>
          </Col>
          <Col xs={15} md={10} align="right">
            <Timer
              formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
            >
              <p>
                You've been working here for <Timer.Minutes />:
                <Timer.Seconds
                  formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
                />
              </p>
            </Timer>
          </Col>
        </Row>
      }
      // headStyle={{ backgroundColor: "#40a9ff", color: "white" }}
    >
      <Row gutter={[50, 0]}>
        <Col xs={24} md={16}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <h2 style={{ fontSize: "16px" }}>
              {props.discussionParticipant.name}'s Question
            </h2>
            <CollapsedQuestion
              details={props.discussionParticipant.description}
              highlightKeys={props.similarKeys}
              words
            />
          </Space>
        </Col>
        <Col xs={24} md={8}>
          <Space
            className="group-interaction"
            direction="vertical"
            style={{ width: "100%" }}
          >
            <h2 style={{ fontSize: "16px" }}>Participants</h2>

            <List
              itemLayout="horizontal"
              dataSource={props.discussionParticipant.participants}
              renderItem={(item, index) => (
                <List.Item
                  extra={
                    props.discussion && (
                      <CloseOutlined
                        style={{ color: "red" }}
                        onClick={() => kickPerson(item)}
                      />
                    )
                  }
                >
                  <List.Item.Meta
                    title={
                      <p style={{ paddingTop: "4px" }}>
                        {item.name || `Participant ${index + 1}`}
                      </p>
                    }
                    avatar={<Avatar src={item.avatar || DefaultProfile} />}
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
export default WotoGroup;

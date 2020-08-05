import React from "react";
import { Row, Col, Card, Space, List, Avatar } from "antd";
import CollapsedQuestion from "../../components/collapsedquestion/CollapsedQuestion";
import Timer from "react-compound-timer";
import { CloseOutlined } from "@ant-design/icons";
import { DefaultProfile } from "../../static/Images";
import EditSubmission from "../../components/buttons/EditSubmission";

import "./Help.css";

const GroupInteraction = (props) => {
  console.log(props.discussionParticipant);

  var similarKeys = [];
  if (props.joinedDiscussion) {
    const discussionKeys = Object.keys(props.joinedDiscussion.description);
    const descriptionKeys = Object.keys(props.description);
    discussionKeys.forEach((key) => {
      if (descriptionKeys[key] === props.joinedDiscussion.description[key]) {
        similarKeys.push(key);
      }
    });
  }

  const kickPerson = (person) => {
    // mark person as inactive
    console.log(person);
  };
  return (
    <Row className="group-interaction">
      <Col xs={24} md={8}>
        <Card
          title={
            <Space>
              <h2>Your Question</h2>
              <EditSubmission
                question={props.description}
                handleSubmit={props.editTAQuestion}
              />
            </Space>
          }
        >
          <CollapsedQuestion
            details={props.description}
            highlightKeys={similarKeys}
            words
          />
        </Card>
      </Col>
      <Col xs={24} md={16}>
        <Card
          title={
            <Row>
              <Col xs={9} lg={16}>
                <h2>
                  {props.discussionParticipant
                    ? `${props.discussionParticipant.name}'s Woto Room`
                    : "Create a Woto Room"}
                </h2>
              </Col>
              <Col xs={15} lg={8} align="right">
                {props.discussionParticipant && (
                  <Timer
                    formatValue={(value) =>
                      `${value < 10 ? `0${value}` : value}`
                    }
                  >
                    <p>
                      You've been working here for <Timer.Minutes />:
                      <Timer.Seconds
                        formatValue={(value) =>
                          `${value < 10 ? `0${value}` : value}`
                        }
                      />
                    </p>
                  </Timer>
                )}
              </Col>
            </Row>
          }
          // headStyle={{ backgroundColor: "#40a9ff", color: "white" }}
        >
          <Row gutter={[50, 0]}>
            <Col xs={24} md={9}>
              {props.discussionParticipant && (
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
                          props.discussionParticipant.isYou && (
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
                          avatar={
                            <Avatar src={item.avatar || DefaultProfile} />
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Space>
              )}
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default GroupInteraction;

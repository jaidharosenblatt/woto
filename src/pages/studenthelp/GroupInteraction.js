import React, { useContext } from "react";
import { Row, Col, Card, Space, List, Avatar } from "antd";
import CollapsedQuestion from "../../components/collapsedquestion/CollapsedQuestion";
import { CloseOutlined } from "@ant-design/icons";
import { DefaultProfile } from "../../static/Images";
import Timer from "react-compound-timer";
import "./Help.css";
import { AuthContext } from "../../contexts/AuthContext";

const GroupInteraction = (props) => {
  const { state } = useContext(AuthContext);
  const userIsOwner =
    props.discussionParticipant &&
    state.user.Id === props.discussionParticipant.owner._id;

  const kickPerson = (person) => {
    // mark person as inactive
    console.log(person);
  };
  return (
    <Card
      title={
        <Row>
          <Col xs={9} lg={16}>
            <b>
              {props.discussionParticipant.name
                ? `${props.discussionParticipant.name}'s Woto Room`
                : "Woto Room"}
            </b>
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
        <Col xs={24} md={15}>
          <CollapsedQuestion
            name={props.discussionParticipant.name}
            details={props.description}
            joinedDiscussion={props.discussionParticipant}
          />
        </Col>
        <Col xs={24} md={9}>
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
                    userIsOwner && (
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

export default GroupInteraction;

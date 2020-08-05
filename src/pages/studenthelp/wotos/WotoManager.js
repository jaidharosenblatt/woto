import React, { useState, useEffect } from "react";
import { Row, Col, Card, Space } from "antd";
import CollapsedQuestion from "../../../components/collapsedquestion/CollapsedQuestion";
import EditSubmission from "../../../components/buttons/EditSubmission";
import WotoGroupJoined from "./WotoGroupJoined";
import WotoGroupOwner from "./WotoGroupOwner";
import CreateWoto from "./CreateWoto";

const WotoManager = (props) => {
  const [similarKeys, setSimilarKeys] = useState([]);

  useEffect(() => {
    if (props.discussionParticipant) {
      const tempKeys = [];
      const discussionKeys = Object.keys(
        props.discussionParticipant.description
      );

      discussionKeys.forEach((key) => {
        if (
          props.description[key] ===
          props.discussionParticipant.description[key]
        ) {
          tempKeys.push(key);
        }
      });
      console.log(tempKeys);
      setSimilarKeys([...tempKeys]);
    }
  }, [props.discussionParticipant, props.description]);

  return (
    <Row className="group-interaction">
      <Col xs={24} md={8}>
        <Card
          headStyle={{ padding: "12px 16px" }}
          title={
            <Space direction="vertical">
              <Space>
                <h2>Your Question</h2>
                <EditSubmission
                  question={props.description}
                  handleSubmit={props.editQuestion}
                />
              </Space>
              {props.discussionParticipant && (
                <p>Similarities with your group are highlighted</p>
              )}
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
        {props.discussionParticipant && (
          <WotoGroupJoined similarKeys={similarKeys} {...props} />
        )}
        {props.discussion && !props.discussion.archived && (
          <WotoGroupOwner {...props} />
        )}
        {!props.discussionParticipant &&
          (!props.discussion ||
            (props.discussion && props.discussion.archived)) && (
            <CreateWoto {...props} />
          )}
      </Col>
    </Row>
  );
};

export default WotoManager;

import React, { useState, useEffect } from "react";
import { Row, Col, Card, Space } from "antd";
import CollapsedQuestion from "../../components/collapsedquestion/CollapsedQuestion";
import EditSubmission from "../../components/buttons/EditSubmission";

import "./Help.css";
import WotoGroup from "./WotoGroup";

const GroupInteraction = (props) => {
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
        {props.discussionParticipant && (
          <WotoGroup similarKeys={similarKeys} {...props} />
        )}
      </Col>
    </Row>
  );
};

export default GroupInteraction;

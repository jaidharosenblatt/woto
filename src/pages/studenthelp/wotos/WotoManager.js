import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Space } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";

import CollapsedQuestion from "../../../components/collapsedquestion/CollapsedQuestion";
import EditSubmission from "../../../components/buttons/EditSubmission";
import WotoGroupJoined from "./WotoGroupJoined";
import WotoGroupOwner from "./WotoGroupOwner";
import CreateWoto from "./CreateWoto";

const WotoManager = (props) => {
  const { state, dispatch } = useContext(HelpContext);
  const [similarKeys, setSimilarKeys] = useState([]);

  useEffect(() => {
    if (state.discussionParticipant) {
      const tempKeys = [];
      const discussionKeys = Object.keys(
        state.discussionParticipant.description
      );

      discussionKeys.forEach((key) => {
        let myValue = state.description[key];
        let theirValue = state.discussionParticipant.description[key];
        if (myValue === theirValue) {
          tempKeys.push(key);
        }
        if (Array.isArray(myValue)) {
          let intersect = myValue.filter((value) => theirValue.includes(value));
          console.log(intersect);
          tempKeys.push(key);
        }
      });
      console.log(tempKeys);
      setSimilarKeys([...tempKeys]);
    }
  }, [state.discussionParticipant, state.description]);

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
                  question={state.description}
                  handleSubmit={(values) =>
                    functions.editSubmission(state, dispatch, values)
                  }
                />
              </Space>
              {state.discussionParticipant && (
                <p>Similarities with your group are highlighted</p>
              )}
            </Space>
          }
        >
          <CollapsedQuestion
            details={state.description}
            highlightKeys={similarKeys}
            words
          />
        </Card>
      </Col>
      <Col xs={24} md={16}>
        {state.discussionParticipant && (
          <WotoGroupJoined similarKeys={similarKeys} {...props} />
        )}
        {state.discussion && !state.discussion.archived && <WotoGroupOwner />}
        {!state.discussionParticipant &&
          (!state.discussion ||
            (state.discussion && state.discussion.archived)) && <CreateWoto />}
      </Col>
    </Row>
  );
};

export default WotoManager;

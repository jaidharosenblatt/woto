import React, { useContext } from "react";
import { Row, Col, Card, Space } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";

import CollapsedQuestion from "../../../components/collapsedquestion/CollapsedQuestion";
import EditSubmission from "../../../components/buttons/EditSubmission";
import WotoGroupJoined from "./WotoGroupJoined";
import WotoGroupOwner from "./WotoGroupOwner";
import CreateWoto from "./CreateWoto";

const WotoManager = () => {
  const { state, dispatch } = useContext(HelpContext);

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
            highlightKeys={state.commonValues}
            words
          />
        </Card>
      </Col>
      <Col xs={24} md={16}>
        {state.discussionParticipant && (
          <WotoGroupJoined similarKeys={state.commonValues} />
        )}
        {state.discussion && !state.discussion?.archived && <WotoGroupOwner />}
        {!state.discussionParticipant &&
          (!state.discussion || state.discussion?.archived) && <CreateWoto />}
      </Col>
    </Row>
  );
};

export default WotoManager;

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

  const Page = () => {
    if (state.discussionParticipant) {
      return <WotoGroupJoined similarKeys={state.commonValues} />;
    }

    if (state.discussion && !state.discussion?.archived) {
      return <WotoGroupOwner />;
    }
    return <CreateWoto />;
  };

  return (
    <Row className="group-interaction">
      {state.description && (
        <Col xs={24} md={8}>
          <Card
            headStyle={{ padding: "12px 16px" }}
            title={
              <Space direction="vertical">
                <Space>
                  <h2>Your Question</h2>
                  <EditSubmission
                    questionTemplate={
                      state.course?.sessionAttributes?.questionTemplate
                    }
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
      )}
      <Col xs={24} md={16}>
        <Page />
      </Col>
    </Row>
  );
};

export default WotoManager;

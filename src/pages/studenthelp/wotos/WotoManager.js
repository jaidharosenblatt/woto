import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Alert } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";

import WotoGroupJoined from "./WotoGroupJoined";
import WotoGroupOwner from "./WotoGroupOwner";
import CreateWoto from "./CreateWoto";
import JoinWoto from "./JoinWoto";
import { filterDiscussionsByKey } from "../../../utilfunctions/getCommonValues";
import WotoRoomsStudent from "../../../components/Tables/collabtable/WotoRoomsStudent";
import YourQuestion from "./YourQuestion";

const WotoManager = () => {
  const { state, dispatch } = useContext(HelpContext);
  const [relevantDiscussions, setRelevantDiscussions] = useState([]);
  const firstKey = Object.keys(state.description)[0];

  useEffect(() => {
    async function getDiscussions() {
      const discussions = await functions.setDiscussions(state, dispatch);
      const temp = filterDiscussionsByKey(
        discussions,
        state.description,
        firstKey
      );
      setRelevantDiscussions([...temp]);
    }
    getDiscussions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.description]);

  const Page = () => {
    if (state.discussionParticipant) {
      return <WotoGroupJoined similarKeys={state.commonValues} />;
    }
    if (state.discussion && !state.discussion?.archived) {
      return <WotoGroupOwner />;
    }
    if (state.description) {
      return relevantDiscussions.length === 0 ? (
        <CreateWoto />
      ) : (
        <JoinWoto
          relevantDiscussions={relevantDiscussions}
          helpKey={firstKey}
        />
      );
    }

    return null;
  };

  return (
    <Col>
      <Row className="group-interaction">
        {state.description && (
          <Col xs={24} md={8}>
            <YourQuestion />
          </Col>
        )}
        <Col xs={24} md={16}>
          <Page />
        </Col>
      </Row>
      {state.session?.sessionAttributes?.collabsize &&
        state.question.description && (
          <Alert
            message={`According to your Professor's collaboration policy, a maximum of ${state.course.sessionAttributes.collabsize} students can
              be in a Woto Room at a time.`}
            type="info"
          />
        )}
      {state.question?.description && <WotoRoomsStudent queueTime={25} />}
    </Col>
  );
};

export default WotoManager;

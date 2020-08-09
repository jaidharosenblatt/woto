import React, { useContext } from "react";
import { Row, Col, Alert } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";

import WotoRoomsStudent from "../../../components/Tables/collabtable/WotoRoomsStudent";
import TitleHeader from "../../../components/header/TitleHeader";
import WotoGroupJoined from "./WotoGroupJoined";
import WotoGroupOwner from "./WotoGroupOwner";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const WotoRoom = () => {
  const { state, dispatch } = useContext(HelpContext);

  return (
    <Row align="center">
      <Col span={24}>
        <TitleHeader
          title={`${state.course.code}'s Woto Rooms`}
          details={
            <h3>
              Open video rooms for you to collaborate with students on classwork
            </h3>
          }
        />
        {state.course?.activeSession ? (
          <Alert
            style={{ cursor: "pointer" }}
            onClick={() => functions.joinQueue(state, dispatch)}
            message="There is an active office hours session from now until 4pm. Click here to join!"
            type="success"
          />
        ) : (
          <Alert
            message={`There are no active office hour sessions for ${state.course.code} right now. Try working together with peers`}
            type="warning"
          />
        )}

        {state.course.sessionAttributes?.collabsize && (
          <Alert
            message={`According to your Professor's collaboration policy, a maximum of ${state.course.sessionAttributes.collabsize} students can
              be in a Woto Room at a time.`}
            type="info"
          />
        )}

        {state.discussionParticipant && <WotoGroupJoined />}
        {!state.discussion?.archived && <WotoGroupOwner />}

        <WotoRoomsStudent addWotoButton />
      </Col>
    </Row>
  );
};

export default WotoRoom;

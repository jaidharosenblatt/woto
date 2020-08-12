import React, { useContext, useState, useEffect, useCallback } from "react";
import { Row, Col, Alert } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";
import { AuthContext } from "../../../contexts/AuthContext";
import WotoRoomsStudent from "../../../components/Tables/collabtable/WotoRoomsStudent";
import TitleHeader from "../../../components/header/TitleHeader";
import LocationTimeTag from "../../../components/header/LocationTimeTag";
import DataHeader from "./discussioncard/DataHeader";
import DiscussionCard from "./discussioncard/DiscussionCard";

import WotoGroup from "./WotoGroup";
import AddWotoButton from "../../../components/buttons/AddWotoButton";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const WotoRoom = () => {
  const { state, dispatch } = useContext(HelpContext);
  const authContext = useContext(AuthContext);
  const [dataDisplay, setDataDisplay] = useState("table");

  const inWoto =
    state.discussionParticipant ||
    (state.discussion && !state.discussion.archived);

  const loadData = useCallback(async () => {
    const discussions = await functions.setDiscussions(state, dispatch);
    functions.getPastDiscussion(
      state,
      dispatch,
      discussions,
      authContext.state
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Row align="center">
      <Col span={24}>
        <TitleHeader
          title={`${state.course.code}`}
          details={<LocationTimeTag time="No Active Sessions" />}
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
        {state.discussion && !state.discussion.archived && (
          <WotoGroup isOwner discussion={state.discussion} />
        )}
        {state.discussionParticipant && (
          <WotoGroup discussion={state.discussionParticipant} />
        )}

        <DataHeader
          inWoto={inWoto}
          refresh={loadData}
          dataDisplay={dataDisplay}
          setDataDisplay={setDataDisplay}
          createWotoButton={
            <AddWotoButton
              videoRoom
              questionTemplate={
                state.course?.sessionAttributes?.questionTemplate
              }
              handleSubmit={(values) =>
                functions.postDiscussion(state, dispatch, values)
              }
            />
          }
        />

        {dataDisplay === "table" && <WotoRoomsStudent />}
        {dataDisplay === "cards" &&
          state.discussions.map((discussion, index) => {
            return <DiscussionCard discussion={discussion} key={index} />;
          })}
      </Col>
    </Row>
  );
};

export default WotoRoom;

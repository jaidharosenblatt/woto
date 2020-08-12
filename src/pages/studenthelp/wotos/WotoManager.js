import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Alert, Card } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";
import { getOrList } from "../../../utilfunctions/getOrList";
import WotoGroup from "./WotoGroup";
import CreateWoto from "./CreateWoto";
import JoinWoto from "./JoinWoto";
import { getStudentCountByKey } from "../../../utilfunctions/getCommonValues";
import { sortDiscussionsByDescription } from "../../../components/Tables/collabtable/getCollabData";
import WotoRoomsStudent from "../../../components/Tables/collabtable/WotoRoomsStudent";
import YourQuestion from "./discussioncard/YourQuestion";
import DiscussionCard from "./discussioncard/DiscussionCard";
import DataHeader from "./discussioncard/DataHeader";

const WotoManager = () => {
  const { state, dispatch } = useContext(HelpContext);

  const [relevantDiscussions, setRelevantDiscussions] = useState([]);
  const [studentCount, setStudentCount] = useState(0);

  const [dataDisplay, setDataDisplay] = useState();
  const [create, setCreate] = useState(false);

  // Filter based on first key

  const firstKey = state.description && Object.keys(state.description)[0];
  var filterValue = state.description && state.description[firstKey];
  // Get list of values comma seperated with "or"
  filterValue = getOrList(filterValue);

  const inWoto =
    (state.discussion && !state.discussion.archived) ||
    state.discussionParticipant;

  // if already in a discussion then show data
  if (!dataDisplay && inWoto) {
    setDataDisplay("table");
  }

  async function getDiscussions() {
    const discussions = await functions.setDiscussions(state, dispatch);
    const studentCount = getStudentCountByKey(
      discussions,
      state.description,
      firstKey
    );
    const sorted = sortDiscussionsByDescription(discussions, state.description);

    setStudentCount(studentCount);
    setRelevantDiscussions([...sorted]);
  }

  useEffect(() => {
    if (state.discussions.length === 0) {
      getDiscussions();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.description]);

  // Switch to create a woto page and scroll to top of screen
  const handleCreate = () => {
    window.scrollTo(0, 40);

    setCreate(true);
  };

  const handleReset = () => {
    setCreate(false);
    setDataDisplay(undefined);
  };

  const Page = () => {
    if (state.discussion && !state.discussion?.archived) {
      return <WotoGroup isOwner discussion={state.discussion} />;
    }
    if (state.discussionParticipant) {
      return (
        <WotoGroup
          discussion={state.discussionParticipant}
          similarKeys={state.commonValues}
        />
      );
    }
    if (create) {
      return (
        <CreateWoto
          handleCancel={() => setCreate(false)}
          handleCreate={() => setDataDisplay("table")}
        />
      );
    }
    if (dataDisplay) {
      return (
        <Card className="centered-body-card">
          Join one of the Woto Rooms below or{" "}
          <b onClick={handleReset}>hide them</b> for now
        </Card>
      );
    }
    if (state.description) {
      return relevantDiscussions.length === 0 ? (
        <CreateWoto
          label="View Rooms"
          handleCancel={() => setCreate(false)}
          handleCreate={() => setDataDisplay("table")}
        />
      ) : (
        <JoinWoto
          handleCreate={handleCreate}
          studentCount={studentCount}
          filterValue={filterValue}
          handleFind={() => setDataDisplay("cards")}
        />
      );
    }

    return null;
  };

  return (
    <Col className="woto-manager">
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
      {dataDisplay &&
        state.session?.sessionAttributes?.collabsize &&
        state.question.description && (
          <Alert
            message={`According to your Professor's collaboration policy, a maximum of ${state.course.sessionAttributes.collabsize} students can
              be in a Woto Room at a time.`}
            type="info"
          />
        )}
      {dataDisplay && (
        <DataHeader
          inWoto={inWoto}
          refresh={getDiscussions}
          dataDisplay={dataDisplay}
          setDataDisplay={setDataDisplay}
          createWoto={handleCreate}
        />
      )}
      {dataDisplay === "table" && <WotoRoomsStudent />}
      {dataDisplay === "cards" &&
        relevantDiscussions.map((discussion, index) => {
          return <DiscussionCard discussion={discussion} key={index} />;
        })}
    </Col>
  );
};

export default WotoManager;

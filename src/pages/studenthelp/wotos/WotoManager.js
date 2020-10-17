import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Alert, Card } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";
import { getOrList } from "../../../utilfunctions/getOrList";
import WotoGroup from "./WotoGroup";
import CreateWoto from "./CreateWoto";
import JoinWoto from "./JoinWoto";
import { getStudentCountByKey } from "../../../utilfunctions/getCommonValues";
import {
  sortDiscussionsByDescription,
  getCountsForFirstField,
} from "../../../components/Tables/collabtable/getCollabData";
import WotoRoomsStudent from "../../../components/Tables/collabtable/WotoRoomsStudent";
import YourQuestion from "./discussioncard/YourQuestion";
import DiscussionCard from "./discussioncard/DiscussionCard";
import DataHeader from "./discussioncard/DataHeader";
import { AuthContext } from "../../../contexts/AuthContext";

/**
 * Container class for managing Wotos for an active session
 */
const WotoManager = () => {
  const { state, dispatch } = useContext(HelpContext);

  const authContext = useContext(AuthContext);
  const [sortedDiscussions, setSortedDiscussions] = useState([]);

  const [discussionMatch, setDiscussionMatch] = useState(0);

  const [dataDisplay, setDataDisplay] = useState();
  const [create, setCreate] = useState(false);

  // Filter based on first key

  const firstKey = state.description && Object.keys(state.description)[0];
  const firstValue = state.description && state.description[firstKey];
  // Get list of values comma seperated with "or"
  const filterValue = getOrList(firstValue);

  const inWoto =
    (state.discussion && !state.discussion.archived) ||
    state.discussionParticipant;

  // if already in a discussion then show data
  if (!dataDisplay && inWoto) {
    setDataDisplay("table");
  }

  // the number of students with a matching first field
  const questionCount = getCountsForFirstField(
    firstKey,
    firstValue,
    state.stats
  );

  async function getDiscussions() {
    const discussions = await functions.setDiscussions(state, dispatch);
    functions.getPastDiscussion(
      state,
      dispatch,
      discussions,
      authContext.state
    );
    const discussionMatch = getStudentCountByKey(
      discussions,
      state.description,
      firstKey
    );
    const sorted = sortDiscussionsByDescription(discussions, state.description);
    console.log(sorted);
    setDiscussionMatch(discussionMatch);
    setSortedDiscussions([...sorted]);
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

  // remove all data display
  const handleReset = () => {
    setCreate(false);
    setDataDisplay(undefined);
  };

  /**
   * render create/edit room block based on state
   */
  const Page = () => {
    /// you are owner of an active discussion
    if (state.discussion && !state.discussion?.archived) {
      return <WotoGroup isOwner discussion={state.discussion} />;
    }
    // you are a participant in an active discussion
    if (state.discussionParticipant) {
      return (
        <WotoGroup
          discussion={state.discussionParticipant}
          similarKeys={state.commonValues}
        />
      );
    }
    // you are in the process of creating a woto room
    if (create) {
      return (
        <CreateWoto
          handleCancel={() => setCreate(false)}
          handleCreate={() => setDataDisplay("table")}
        />
      );
    }
    // you are viewing woto rooms
    if (dataDisplay) {
      return (
        <Card className="centered-body-card">
          Join one of the Woto Rooms below or{" "}
          <b onClick={handleReset}>hide them</b> for now
        </Card>
      );
    }
    if (state.description) {
      // if there are no discussions at all then create one
      if (sortedDiscussions.length === 0) {
        return <CreateWoto handleCreate={() => setDataDisplay("table")} />;
      }
      // if no matching discussions then create one or view all rooms
      else if (discussionMatch === 0) {
        return (
          <CreateWoto
            studentCount={questionCount}
            label="View All Rooms"
            handleCancel={() => {
              setCreate(false);
              setDataDisplay("table");
            }}
            handleCreate={() => setDataDisplay("table")}
          />
        );
      }

      // Otherwise there must be a relevant discussion to join
      else {
        return (
          <JoinWoto
            handleCreate={handleCreate}
            studentCount={discussionMatch}
            filterValue={filterValue}
            handleFind={() => setDataDisplay("cards")}
          />
        );
      }
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
      {dataDisplay && state.session?.collabsize && state.question.description && (
        <Alert
          message={`According to your Professor's collaboration policy, a maximum of ${state.course.collabsize} students can
              be in a Woto Room at a time.`}
          type="info"
        />
      )}
      {dataDisplay && (
        <Card
          className="data-display"
          title={
            <DataHeader
              inWoto={inWoto}
              refresh={getDiscussions}
              dataDisplay={dataDisplay}
              setDataDisplay={setDataDisplay}
              createWoto={handleCreate}
            />
          }
        >
          {dataDisplay === "table" && <WotoRoomsStudent />}
          {dataDisplay === "cards" &&
            sortedDiscussions.map((discussion, index) => {
              return <DiscussionCard discussion={discussion} key={index} />;
            })}
        </Card>
      )}
    </Col>
  );
};

export default WotoManager;

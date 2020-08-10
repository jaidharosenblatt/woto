import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Alert, Card } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";

import WotoGroupJoined from "./WotoGroupJoined";
import WotoGroupOwner from "./WotoGroupOwner";
import CreateWoto from "./CreateWoto";
import JoinWoto from "./JoinWoto";
import { filterDiscussionsByKey } from "../../../utilfunctions/getCommonValues";
import WotoRoomsStudent from "../../../components/Tables/collabtable/WotoRoomsStudent";
import YourQuestion from "./YourQuestion";
import DiscussionCard from "./discussioncard/DiscussionCard";
import DataHeader from "./discussioncard/DataHeader";

const WotoManager = () => {
  const { state, dispatch } = useContext(HelpContext);
  const [relevantDiscussions, setRelevantDiscussions] = useState([]);
  const [dataDisplay, setDataDisplay] = useState();
  const [create, setCreate] = useState(false);

  const firstKey = Object.keys(state.description)[0];
  // const firstKey = "details";

  var filterValue = state.description[firstKey];
  if (Array.isArray(filterValue)) {
    let s = "";
    filterValue.forEach((val, index) => {
      if (index === filterValue.length - 2) {
        s += `${val} or `;
      } else if (index === filterValue.length - 1) {
        s += val;
      } else {
        s += `${val}, `;
      }
    });
    filterValue = s;
  }

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
    if (create) {
      return <CreateWoto handleClick={() => setCreate(false)} />;
    }
    if (dataDisplay) {
      return (
        <Card className="centered-body-card">
          Join one of the Woto Rooms below
        </Card>
      );
    }
    if (state.description) {
      return relevantDiscussions.length === 0 ? (
        <CreateWoto
          label="View Rooms"
          handleClick={() => setDataDisplay("table")}
        />
      ) : (
        <JoinWoto
          relevantDiscussions={relevantDiscussions}
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
          dataDisplay={dataDisplay}
          setDataDisplay={setDataDisplay}
          createWoto={() => setCreate(true)}
        />
      )}
      {dataDisplay === "table" && <WotoRoomsStudent queueTime={25} />}
      {dataDisplay === "cards" &&
        relevantDiscussions.map((discussion, index) => {
          return <DiscussionCard discussion={discussion} key={index} />;
        })}
    </Col>
  );
};

export default WotoManager;

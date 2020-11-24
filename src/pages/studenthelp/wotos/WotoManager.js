import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Alert, Card } from "antd";
import { CourseContext } from "../util/CourseContext";
import { getOrList } from "../../../utilfunctions/getOrList";
import WotoRoomsStudent from "../../../components/Tables/collabtable/WotoRoomsStudent";
import WotoGroup from "./WotoGroup";
import CreateWoto from "./CreateWoto";
import {
  sortDiscussionsByDescription,
  getCountsForFirstField,
} from "../../../components/Tables/collabtable/getCollabData";
import YourQuestion from "./discussioncard/YourQuestion";
import DataHeader from "./discussioncard/DataHeader";
import { AuthContext } from "../../../contexts/AuthContext";
import redux from "../../../redux/courses";
import { connect } from "react-redux";
/**
 * Container class for managing Wotos for an active session
 */
const WotoManager = (props) => {
  const courseID = useContext(CourseContext);
  const {
    loading,
    session,
    stats,
    activeDiscussion,
    description,
    discussions,
  } = redux.select(props.courses, courseID);

  const [sortedDiscussions, setSortedDiscussions] = useState([]);
  const [discussionMatch, setDiscussionMatch] = useState(0);
  const [create, setCreate] = useState(false);
  const auth = useContext(AuthContext);
  const userID = auth.state.user._id;

  // Filter based on first key
  const firstKey = description && Object.keys(description)[0];
  const firstValue = description && description[firstKey];
  // Get list of values comma seperated with "or"
  const filterValue = getOrList(firstValue);

  useEffect(() => {
    const sorted = sortDiscussionsByDescription(discussions, description);
    setSortedDiscussions([...sorted]);
    const counts = getCountsForFirstField(firstKey, filterValue, stats);
    setDiscussionMatch(counts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);

  // Switch to create a woto page and scroll to top of screen
  const handleCreate = () => {
    window.scrollTo(0, 40);

    setCreate(true);
  };

  /**
   * render create/edit room block based on state
   */
  const Page = () => {
    if (activeDiscussion) {
      return <WotoGroup discussion={activeDiscussion} />;
    }
    // you are in the process of creating a woto room
    if (create) {
      return <CreateWoto handleCancel={() => setCreate(false)} />;
    }
    // you are viewing woto rooms
    return (
      <Card className="centered-body-card">
        <strong>Join or create a Woto Room below!</strong>
      </Card>
    );
  };

  return (
    <Col className="woto-manager">
      <Row className="group-interaction">
        {description && (
          <Col xs={24} md={8}>
            <YourQuestion />
          </Col>
        )}
        <Col xs={24} md={16}>
          <Page />
        </Col>
      </Row>
      {session?.collabsize && (
        <Alert
          message={`According to your Professor's collaboration policy, a maximum of ${session?.collabsize} students can
              be in a Woto Room at a time.`}
          type="info"
        />
      )}
      <Card
        className="data-display"
        title={
          <DataHeader
            inWoto={!!activeDiscussion}
            refresh={() => props.loadDiscussions(courseID, userID)}
            loading={loading}
            createWoto={handleCreate}
          />
        }
      >
        <WotoRoomsStudent courseID={courseID} />
      </Card>
    </Col>
  );
};

export default connect(redux.mapStateToProps, redux)(WotoManager);

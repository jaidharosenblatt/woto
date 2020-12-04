import React, { useState } from "react";
import { Row, Col, Alert, Card } from "antd";
import WotoRoomsStudent from "../../../components/Tables/collabtable/WotoRoomsStudent";
import WotoGroup from "./WotoGroup";
import CreateWoto from "./CreateWoto";
import YourQuestion from "./discussioncard/YourQuestion";
import DataHeader from "./discussioncard/DataHeader";
import { loadDiscussions } from "../../../redux/courses/student";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
/**
 * Container class for managing Wotos for an active session
 */
const WotoManager = (props) => {
  const courseID = props.course._id;
  const { loading, session, activeDiscussion, description } = props;

  const [create, setCreate] = useState(false);

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
            refresh={() => props.loadDiscussions()}
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

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    loading: selectors.getLoading(state),
    session: selectors.getSession(state),
    stats: selectors.getStats(state),
    activeDiscussion: selectors.getActiveDiscussion(state),
    description: selectors.getDescription(state),
    discussions: selectors.getDiscussions(state),
  };
};

export default connect(mapStateToProps, { loadDiscussions })(WotoManager);

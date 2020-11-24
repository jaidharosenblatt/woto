import React, { useContext } from "react";
import { Row, Col, Alert, Card } from "antd";
import { AuthContext } from "../../../contexts/AuthContext";
import WotoRoomsStudent from "../../../components/Tables/collabtable/WotoRoomsStudent";
import TitleHeader from "../../../components/header/TitleHeader";
import LocationTimeTag from "../../../components/header/LocationTimeTag";
import DataHeader from "./discussioncard/DataHeader";
import YourQuestion from "./discussioncard/YourQuestion";
import WotoGroup from "./WotoGroup";
import AddWotoButton from "../../../components/buttons/AddWotoButton";
import redux from "../../../redux/courses";
import { connect } from "react-redux";
import { CourseContext } from "../util/CourseContext";
import { convertTimeString } from "../../../utilfunctions/timeAgo";
/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const WotoRoom = (props) => {
  const courseID = useContext(CourseContext);
  const auth = useContext(AuthContext);
  const userID = auth.state.user._id;
  const { course, session, activeDiscussion, loading } = redux.select(
    props.courses,
    courseID
  );

  return (
    <Row align="center">
      <Col span={24}>
        <TitleHeader
          title={`${course?.code}`}
          details={<LocationTimeTag time="No Active Sessions" />}
        />
        {session ? (
          <Alert
            style={{ cursor: "pointer" }}
            onClick={() => props.setBypassSession(courseID, true)}
            message={`There is an active office hours session from now until ${convertTimeString(
              session.endTime
            )}. Click here to join!`}
            type="success"
          />
        ) : (
          <Alert
            message={`There are no active office hour sessions for ${course?.code} right now. Try working together with peers`}
            type="warning"
          />
        )}

        {session?.collabsize && (
          <Alert
            message={`According to your Professor's collaboration policy, a maximum of ${session.collabsize} students can
              be in a Woto Room at a time.`}
            type="info"
          />
        )}

        {activeDiscussion ? (
          <Row className="group-interaction">
            <Col xs={24} md={8}>
              <YourQuestion />
            </Col>
            <Col xs={24} md={16}>
              <WotoGroup />
            </Col>
          </Row>
        ) : null}

        <Card
          className="data-display"
          title={
            <DataHeader
              inWoto={!!activeDiscussion}
              refresh={() => props.loadDiscussions(courseID, userID)}
              loading={loading}
              createWotoButton={
                <AddWotoButton
                  videoRoom
                  questionTemplate={session?.questionTemplate}
                  handleSubmit={(values) => {
                    props.postDiscussion(
                      courseID,
                      userID,
                      values,
                      values.meetingURL
                    );
                  }}
                />
              }
            />
          }
        >
          <WotoRoomsStudent courseID={courseID} />
        </Card>
      </Col>
    </Row>
  );
};

export default connect(redux.mapStateToProps, redux)(WotoRoom);

import React, { useContext } from "react";
import { Row, Col, Alert, Card } from "antd";
import functions from "../util/functions";
import { AuthContext } from "../../../contexts/AuthContext";
import WotoRoomsStudent from "../../../components/Tables/collabtable/WotoRoomsStudent";
import TitleHeader from "../../../components/header/TitleHeader";
import LocationTimeTag from "../../../components/header/LocationTimeTag";
import DataHeader from "./discussioncard/DataHeader";
import DiscussionCard from "./discussioncard/DiscussionCard";
import YourQuestion from "./discussioncard/YourQuestion";
import WotoGroup from "./WotoGroup";
import AddWotoButton from "../../../components/buttons/AddWotoButton";
import {
  setBypassSession,
  postDiscussion,
  select,
} from "../../../ducks/courses";
import { connect } from "react-redux";
import { CourseContext } from "../util/CourseContext";
/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const WotoRoom = (props) => {
  const courseID = useContext(CourseContext);
  const auth = useContext(AuthContext);
  const userID = auth.state.user._id;
  const { course, session, activeDiscussion } = select(props.courses, courseID);

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
            onClick={() => props.setBypassSession(false)}
            message={`There is an active office hours session from now until ${session.endTime}. Click here to join!`}
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
        ) : (
          <WotoGroup />
        )}

        <Card
          className="data-display"
          // title={
          //   <DataHeader
          //     inWoto={activeDiscussion}
          //     createWotoButton={
          //       <AddWotoButton
          //         videoRoom
          //         questionTemplate={session?.questionTemplate}
          //         handleSubmit={(values) => {
          //           props.postDiscussion(
          //             courseID,
          //             userID,
          //             values,
          //             values.meetingURL
          //           );
          //         }}
          //       />
          //     }
          //   />
          // }
        >
          {/* {state.discussions.map((discussion, index) => {
            return <DiscussionCard discussion={discussion} key={index} />;
          })} */}
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
  };
};

export default connect(mapStateToProps, { setBypassSession, postDiscussion })(
  WotoRoom
);

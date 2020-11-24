import React, { useContext } from "react";
import { Row, Col, Space, Button, Card } from "antd";
import { PresentationImage } from "../../static/LoadedImages";
import { CourseContext } from "./util/CourseContext";
import { AuthContext } from "../../contexts/AuthContext";
import { connect } from "react-redux";
import redux from "../../redux/courses";

import "./Help.css";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";
import { convertTimeString } from "../../utilfunctions/timeAgo";

const JoinQueue = (props) => {
  const courseID = useContext(CourseContext);
  const authContext = useContext(AuthContext);
  const { course, session, loading } = redux.select(props.courses, courseID);

  return (
    <NavBarCentered>
      <Row className="join-queue" align="middle">
        <Col xs={24}>
          <Card>
            <div className="card-details">
              <PresentationImage className="hero" />
              <Space direction="vertical">
                <h1>
                  Office Hours{" "}
                  {session &&
                    session.endTime &&
                    `Until ${convertTimeString(session.endTime)}`}
                </h1>
                <p>Reserve your spot to work with a TA</p>
                <Button
                  size="large"
                  type="primary"
                  block
                  loading={loading}
                  onClick={() =>
                    props.joinQueue(courseID, authContext.state.user._id)
                  }
                >{`Join ${course && course.code}'s Queue As #${session?.stats
                  .waiting + 1}`}</Button>
                <h3>
                  If you don't want help from a TA and just want to go to the
                  Woto Room click{" "}
                  <b onClick={() => props.setBypassSession(courseID, true)}>
                    here
                  </b>
                </h3>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </NavBarCentered>
  );
};

export default connect(redux.mapStateToProps, redux)(JoinQueue);

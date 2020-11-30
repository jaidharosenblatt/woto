import React, { useContext } from "react";
import { Row, Col, Space, Button, Card } from "antd";
import { PresentationImage } from "../../static/LoadedImages";
import { AuthContext } from "../../contexts/AuthContext";
import { connect } from "react-redux";
import "./Help.css";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";
import util from "../../util";
import selectors from "../../redux/selectors";
import actions from "../../redux/courses/actionCreators";

const JoinQueue = (props) => {
  const authContext = useContext(AuthContext);
  const { course, session, loading } = props;
  const courseID = course?._id;

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
                    `Until ${util.convertTimeString(session.endTime)}`}
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

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    session: selectors.getSession(state),
    loading: selectors.getLoading(state),
  };
};

const { setBypassSession, joinQueue } = actions;

export default connect(mapStateToProps, { setBypassSession, joinQueue })(
  JoinQueue
);

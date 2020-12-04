import React from "react";
import { Row, Col, Space, Button, Card } from "antd";
import { WaitingImage } from "../../static/LoadedImages";
import { connect } from "react-redux";
import "./Help.css";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";
import selectors from "../../redux/selectors";
import actions from "../../redux/courses";
import { useHistory } from "react-router-dom";

const NoActiveSession = (props) => {
  const { course, courseID, loading } = props;
  const history = useHistory();

  return (
    <NavBarCentered>
      <Row className="join-queue" align="middle">
        <Col xs={24}>
          <Card>
            <div className="card-details">
              <WaitingImage className="hero" />
              <Space direction="vertical">
                <h1>{`${course.code} `}</h1>
                <p>
                  Please check back later or visit {course.code}'s{" "}
                  <b onClick={() => history.push(`/${courseID}/schedule`)}>
                    Woto Rooms
                  </b>
                </p>
                <Button
                  size="large"
                  type="primary"
                  block
                  loading={loading}
                  onClick={() => history.push(`/${courseID}/schedule`)}
                >
                  {`See ${course.code}'s office hour schedule`}
                </Button>
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
    courseID: selectors.getCourseID(state),
    loading: selectors.getLoading(state),
    stats: selectors.getStats(state),
  };
};

const { joinQueue } = actions;

export default connect(mapStateToProps, { joinQueue })(NoActiveSession);

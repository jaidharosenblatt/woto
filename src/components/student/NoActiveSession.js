import React from "react";
import { Row, Col, Space, Button } from "antd";
import { WaitingImage } from "../../static/LoadedImages";
import { connect } from "react-redux";
import "./Help.css";
import selectors from "../../redux/selectors";
import { joinQueue } from "../../redux/courses/actions/student";
import { useHistory } from "react-router-dom";

const NoActiveSession = (props) => {
  const { course, courseID, loading } = props;
  const history = useHistory();

  return (
    <Row align="center" justify="center" className="help-card">
      <Col xs={24} md={8}>
        <WaitingImage className="hero2" />
      </Col>
      <Col xs={24} md={16}>
        <Space style={{ width: "100%" }} direction="vertical">
          <h1>{` ${course.code} does not have active office hours`}</h1>
          <p>
            Please check back later or visit {course.code}'s{" "}
            <b onClick={() => history.push(`/${courseID}/woto`)}>Woto Rooms</b>
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
        </Space>{" "}
      </Col>
    </Row>
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

export default connect(mapStateToProps, { joinQueue })(NoActiveSession);

import React from "react";
import { Row, Col, Space, Button, Card } from "antd";
import { PresentationImage } from "../../static/LoadedImages";
import { connect } from "react-redux";
import "./Help.css";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";
import util from "../../util";
import selectors from "../../redux/selectors";
import { joinQueue } from "../../redux/courses/student";

const JoinQueue = (props) => {
  const { course, session, loading } = props;

  return (
    <NavBarCentered>
      <Row className="help-card" align="middle">
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
                  onClick={() => props.joinQueue()}
                >{`Join ${course && course.code}'s Queue As #${props.stats
                  .waiting + 1}`}</Button>
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
    stats: selectors.getStats(state),
  };
};

export default connect(mapStateToProps, { joinQueue })(JoinQueue);

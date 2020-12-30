import React from "react";
import { Space, Button, Col } from "antd";
import { PresentationImage } from "../../static/LoadedImages";
import { connect } from "react-redux";
import "./Help.css";
import util from "../../util";
import selectors from "../../redux/selectors";
import { joinQueue } from "../../redux/courses/actions/student";
import PageCard from "../util-components/centeredpage/PageCard";

const JoinQueue = (props) => {
  const { course, session, loading, stats } = props;

  // const error = () => {
  //   if (session?.endTime <= stats?.averageLength) {
  //     return (
  //       <span block style={{ color: "red" }}>
  //         This session may end before you get help.
  //       </span>
  //     );
  //   }
  // };

  return (
    <PageCard navbar>
      <div className="help-card">
        <PresentationImage className="hero" />
        <Space direction="vertical">
          <h1>
            {`${course.code}'s Office Hours 
            ${
              session?.endTime &&
              `Until ${util.convertTimeString(session.endTime)}`
            }`}
          </h1>
          <p>Reserve your spot to work with a teaching assistant</p>
          <Button
            size="large"
            type="primary"
            block
            loading={loading}
            onClick={() => props.joinQueue()}
          >{`Join as #${props.stats.waiting + 1} in the queue`}</Button>
          <Col span={24} align="middle">
            {session?.endTime <= stats?.averageLength ? (
              <span style={{ color: "red" }}>
                This session may end before you get help.
              </span>
            ) : null}
            {/* {error()} */}
          </Col>
        </Space>
      </div>
    </PageCard>
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

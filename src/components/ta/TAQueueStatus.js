import React from "react";
import { Card, Space, Col } from "antd";
import { connect } from "react-redux";
import { leaveQueue } from "../../redux/courses/actions/student";
import QueueInfo from "../student/QueueInfo";
import LeftRightRow from "../util-components/leftrightrow/LeftRightRow";
import selectors from "../../redux/selectors";
import "./TAQueueStatus.css";

/**
 * Creates a header for a TA Session
 * @Huvon Hutchinson-Goodridge
 */

const TAQueueStatus = (props) => {
  const { course, session } = props;
  return (
    <Col span={24}>
      <Card
        className="Disappear"
        title={
          <div>
            <Col className="HeaderWrapper" span={24}>
              <Col className="HeaderText" span={24}>
                <LeftRightRow
                  left={
                    <Space direction="vertical">
                      <QueueInfo
                        isTA={props.isTA}
                        course={course}
                        session={session}
                      />
                    </Space>
                  }
                  right={props.TAButtons}
                />
              </Col>
            </Col>
          </div>
        }
      />
    </Col>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    course: selectors.getCourse(state),
    session: selectors.getSession(state),
  };
};

export default connect(mapStateToProps, { leaveQueue })(TAQueueStatus);

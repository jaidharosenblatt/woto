import React from "react";
import { Col, Space, Card } from "antd";
import { HourglassOutlined } from "@ant-design/icons";
import OpenSessionForm from "./OpenSessionForm";
import { connect } from "react-redux";
import { openSession } from "../../../redux/courses/actions/ta";
import selectors from "../../../redux/selectors";

/**
 * Wrap open session form in a card with a header
 */
const OpenSession = (props) => {
  const { course } = props;

  return (
    <div className="open-session-form">
      <Card
        title={
          <div className="open-session-form-header">
            <Space size={24}>
              <HourglassOutlined />
              <div>
                <h1>Create a New Session</h1>
                <h3>{course?.code} Office Hours</h3>
              </div>
            </Space>
          </div>
        }
      >
        <Col span={24}>
          <OpenSessionForm
            onSubmit={(values) => props.openSession(values, values.meetingURL)}
          />
        </Col>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
  };
};

export default connect(mapStateToProps, { openSession })(OpenSession);

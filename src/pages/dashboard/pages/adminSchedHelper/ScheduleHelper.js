import React from "react";
import { Row, Col, DatePicker, Space } from "antd";
import HomeHeader from "../../HomeHeader";
import DataSelect from "../../../../components/form/DataSelect";

const { RangePicker } = DatePicker;

//<RangePicker format="MMMM Do" />
/**
 * Allows admin to break down OH by day of week and time of day
 * @param {details} title ex "at a glance"
 * @param {details} description text to display under title
 * @param {course} name name of course
 * @param {course} institution school ex "duke"
 */
const ScheduleHelper = (props) => {
  return (
    <div className="scheduleHelper">
      <Space direction="vertical" size="large">
      <Row justify="center">
        <Col  sm={24} md={22} lg={22} xl={22}>
          <HomeHeader
            course={props.course.name}
            page={props.details.title}
            description={props.details.description}
          />
        </Col>
      </Row>
      <Row justify="center" align="bottom">
        <Col sm={24} md={22} lg={22} xl={22}>
          <RangePicker format="MMMM Do" />
        </Col>
      </Row>
      </Space>

    </div>
  );
};

export default ScheduleHelper;

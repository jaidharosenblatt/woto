import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Button } from "antd";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import selectors from "../../../redux/selectors";
import { courseEnroll } from "../../../redux/sorted-courses/actionCreators";

import { BugImage, SchoolImage } from "../../../static/LoadedImages";

/**
 * Try to enroll a student in a course and show error message on fail
 * Example url -> "/enroll/#key=084758yhroufgbk48y"
 */
const EmailAddCourse = (props) => {
  const history = useHistory();
  const { course, error } = props;
  const _courseEnroll = props.courseEnroll;
  // const url = window.location.href; //url of the current page
  // const userType = url.split("/verify/")[1].split("/")[0];
  useEffect(() => {
    const path = window.location.pathname; //url of the current page
    const split = path.split("="); //this creates an array with key ([0] element) and value ([1] element)
    const key = split[1];

    async function addCourse() {
      await _courseEnroll(key);
    }
    if (!course && !error) {
      addCourse();
    }
  }, [course, error, history, _courseEnroll]);

  return (
    <Col span={24}>
      <Col span={24} align="center">
        {error ? (
          <BugImage className="small-hero-image" />
        ) : (
          <SchoolImage className="small-hero-image" />
        )}
      </Col>
      <Col span={24} align="center">
        <Col style={{ maxWidth: 450 }}>
          <h2 className="verify-failed">
            {course ? `Enrolled in ${course.name} (${course.code})` : error}
          </h2>
          {course && (
            <Link to={`/courses/${course._id}/session`}>
              <Button block type="primary">
                {`Join ${course.code}`}
              </Button>
            </Link>
          )}
        </Col>
      </Col>
    </Col>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    error: selectors.getError(state),
  };
};

export default connect(mapStateToProps, { courseEnroll })(EmailAddCourse);

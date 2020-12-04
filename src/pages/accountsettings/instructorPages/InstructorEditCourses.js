import React, { useEffect, useState } from "react";
import { Space, List, Button } from "antd";
import { Link } from "react-router-dom";
import "../AccountSettings.css";
import ArchiveCourseButton from "../../../components/buttons/ArchiveCourseButton";
import ActivateCourseButton from "../../../components/buttons/ActivateCourseButton";
import API from "../../../api/API";
import LeftRightRow from "../../../components/leftrightrow/LeftRightRow";
import EmptyState from "../EmptyState";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import {
  courseUnarchive,
  courseArchive,
} from "../../../redux/sorted-courses/actionCreators";

/**
 * View all courses for an instructor and change their archived status
 */
const EditCourses = (props) => {
  const [archivedCourses, setArchivedCourses] = useState([]);

  useEffect(() => {
    async function getInactiveCourses() {
      const res = await API.getCourses();
      const inactiveCourses = res.filter((item) => item.archived);
      setArchivedCourses([...inactiveCourses]);
      console.log(inactiveCourses);
    }
    getInactiveCourses();
  }, []);

  const handleArchive = async (course) => {
    props.courseArchive(course);
    setArchivedCourses([...archivedCourses, course]);
  };

  const handleActivate = async (course) => {
    props.courseUnarchive(course);
    const temp = archivedCourses.filter((item) => item._id !== course._id);
    setArchivedCourses([...temp]);
  };

  const getCourseList = (listType) => {
    const courseList =
      listType === "Active Courses" ? props.courses : archivedCourses;

    return courseList.length > 0 ? (
      <List
        loading={props.loading}
        itemLayout="horizontal"
        dataSource={courseList}
        renderItem={(course) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link to={course._id}>
                  {course.code} {course.role && `(${course.role})`}
                </Link>
              }
              description={<h3>{course.name}</h3>}
            />
            {listType === "Active Courses" ? (
              <ArchiveCourseButton
                handleArchive={handleArchive}
                course={course}
              />
            ) : (
              <ActivateCourseButton
                handleActivate={handleActivate}
                course={course}
              />
            )}
          </List.Item>
        )}
      />
    ) : (
      <EmptyState message={`You have no ${listType}`} />
    );
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <LeftRightRow
          left={<h2>Active Courses</h2>}
          right={
            <Link to="/addcourse">
              <Button type="primary">Add New Course</Button>
            </Link>
          }
        />
        {getCourseList("Active Courses")}
      </div>
      <div>
        <h2>Archived Courses</h2>
        {getCourseList("Archived Courses")}
      </div>
    </Space>
  );
};

const mapStateToProps = (state) => {
  return {
    courses: selectors.getSortedCourses(state),
    loading: selectors.getLoading(state),
  };
};

export default connect(mapStateToProps, { courseUnarchive, courseArchive })(
  EditCourses
);

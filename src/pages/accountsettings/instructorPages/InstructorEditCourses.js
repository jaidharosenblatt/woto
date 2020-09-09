import React, { useEffect, useState, useContext } from "react";
import { Card, Space, List, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "../AccountSettings.css";
import ArchiveCourseButton from "../../../components/buttons/ArchiveCourseButton";
import ActivateCourseButton from "../../../components/buttons/ActivateCourseButton";
import API from "../../../api/API";
import { CoursesContext } from "../../../contexts/CoursesContext";
import LeftRightRow from "../../../components/leftrightrow/LeftRightRow";

/**
 * @jaidharosenblatt temporary class for showing 3 TA items
 */
const EditCourses = () => {
  const [loading, setLoading] = useState(true);
  const { courses, setCourses } = useContext(CoursesContext);
  const [archivedCourses, setArchivedCourses] = useState([]);

  useEffect(() => {
    async function getInactiveCourses() {
      const res = await API.getCourses();
      const inactiveCourses = res.filter((item) => item.archived);
      setArchivedCourses([...inactiveCourses]);
      console.log(inactiveCourses);
      setLoading(false);
    }
    getInactiveCourses();
  }, []);

  const handleArchive = async (course) => {
    await API.editCourse(course._id, { archived: true });
    const temp = courses.filter((item) => item._id !== course._id);
    setCourses([...temp]);
    setArchivedCourses([...archivedCourses, course]);
  };

  const handleActivate = async (course) => {
    await API.editCourse(course._id, { archived: false });
    const temp = courses.filter((item) => item._id !== course._id);
    setArchivedCourses([...temp]);
    setCourses([...courses, course]);
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

        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={courses}
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
              <ArchiveCourseButton
                handleArchive={handleArchive}
                course={course}
              />
            </List.Item>
          )}
        />
      </div>
      <div>
        <h2>Archived Courses</h2>
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={archivedCourses}
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
              <ActivateCourseButton
                handleActivate={handleActivate}
                course={course}
              />
            </List.Item>
          )}
        />
      </div>
    </Space>
  );
};

export default EditCourses;

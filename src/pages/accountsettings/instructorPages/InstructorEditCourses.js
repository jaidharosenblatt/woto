import React, { useEffect, useState } from "react";
import { Card, List, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "../AccountSettings.css";
//import UnenrollButton from "../../../components/buttons/UnenrollButton";
import ArchiveCourseButton from "../../../components/buttons/ArchiveCourseButton";
import ActivateCourseButton from "../../../components/buttons/ActivateCourseButton";
import API from "../../../api/API";
//import ArchiveCourseModal from "../../../components/modals/ArchiveCourseModal";

const ActiveCoursesTitle = () => {
  return (
    <div style={{ clear: "both" }}>
      <h2 style={{ float: "left" }}>Active Courses</h2>
      <Link to="/addcourse">
        <Button type="primary" style={{ float: "right" }}>
          Add New Course
        </Button>
      </Link>
    </div>
  );
};

const ArchivedCoursesTitle = () => {
  return (
    <div style={{ clear: "both" }}>
      <h2 style={{ float: "left" }}>Archived Courses</h2>
    </div>
  );
};

/**
 * @jaidharosenblatt temporary class for showing 3 TA items
 */
const EditCourses = () => {
  const [loading, setLoading] = useState(true);
  const [activeCourses, setActiveCourses] = useState([]);
  const [archivedCourses, setArchivedCourses] = useState([]);
  useEffect(() => {
    async function getCourses() {
      const res = await API.getCourses();
      // console.log(res)
      //setCourses(res);
      /*
      const newList = list.filter((item) => item.id !== id);
      */
      const activeCourses = res.filter((item) => item.archived !== true);
      const archivedCourses = res.filter((item) => item.archived === true);
      setActiveCourses(activeCourses);
      setArchivedCourses(archivedCourses);
      setLoading(false);
    }
    getCourses();
  }, []);

  const handleArchive = async (course) => {
    // console.log(course);
    // const archivedCourseId = course._id;
    // const test = { archived: true };
    //const res = await API.editCourse(archivedCourseId, test);
    const res2 = await API.getCourses();
    const activeCourses = res2.filter((item) => item.archived !== true);
    const archivedCourses = res2.filter((item) => item.archived === true);
    setActiveCourses(activeCourses);
    setArchivedCourses(archivedCourses);
    //const res = await API.getCourses();
    // setActiveCourses(unArchivedCourses);
  };

  const handleActivate = async (course) => {
    // console.log(course);
    //const activateCourseId = course._id;
    //const test = { archived: false };
    // const res = await API.editCourse(activateCourseId, test);
    const res2 = await API.getCourses();
    const activeCourses = res2.filter((item) => item.archived !== true);
    const archivedCourses = res2.filter((item) => item.archived === true);
    setActiveCourses(activeCourses);
    setArchivedCourses(archivedCourses);
    //const res = await API.getCourses();
    // setActiveCourses(unArchivedCourses);
  };

  return (
    <Col>
      <Row>
        <Card className="FullWidth" title={<ActiveCoursesTitle />}>
          <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={activeCourses}
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
        </Card>
      </Row>
      <br />
      <Row>
        <Card className="FullWidth" title={<ArchivedCoursesTitle />}>
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
        </Card>
      </Row>
    </Col>
  );
};

export default EditCourses;

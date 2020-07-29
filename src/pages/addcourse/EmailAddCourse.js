import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Col, Button } from "antd";
import API from "../../api/API";
import { SchoolImage, BugImage } from "../../static/Images";
import LoadingScreen from "../../components/spinner/LoadingScreen";
import { CoursesContext } from "../../contexts/CoursesContext";
import { useHistory } from "react-router-dom";

// var url = window.location;
// ex: http://localhost:3000/enroll/student/#key=084758yhroufgbk48y
//TODO have failed screen
const EmailAddCourse = () => {
  const history = useHistory();
  const { courses, setCourses } = useContext(CoursesContext);
  const [loading, setLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const path = window.location.pathname; //url of the current page
    const split = path.split("="); //this creates an array with key ([0] element) and value ([1] element)
    const key = split[1];

    async function verifyUser() {
      try {
        const course = await API.courseEnroll({ accessKey: key });
        setCourseInfo(course);
        setCourses([...courses, course]);
        history.push(`/${course._id}`);
      } catch (error) {
        if (error.response.status === 401) {
          setError("You are already enrolled in this course");
        } else {
          setError(
            "Invalid course code. Please contact your instructor to receive another code"
          );
        }
        console.log("Failed:", error);
      }
    }
    if (!courseInfo && error === "") {
      verifyUser();
    } else {
      setLoading(false);
    }
  }, [courseInfo, error, history, setCourses, courses]);

  return (
    <LoadingScreen loading={loading}>
      <Col span={24}>
        <Col span={24} align="center">
          <img
            className="small-hero-image"
            alt="hero"
            src={error === "" ? SchoolImage : BugImage}
          />
        </Col>
        <Col span={24} align="center">
          <Col style={{ maxWidth: 450 }}>
            <h2 className="verify-failed">
              {courseInfo
                ? `Enrolled in ${courseInfo.name} (${courseInfo.code})`
                : error}
            </h2>
            {courseInfo && (
              <Link to={`/${courseInfo._id}`}>
                <Button block type="primary">
                  {`Join ${courseInfo.code}`}
                </Button>
              </Link>
            )}
          </Col>
        </Col>
      </Col>
    </LoadingScreen>
  );
};

export default EmailAddCourse;

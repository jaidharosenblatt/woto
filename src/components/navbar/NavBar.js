import React, { useEffect, useRef } from "react";
import "./NavBar.css";
import { Row, Col } from "antd";
import MenuItems from "./MenuItems";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import Mobile from "./Mobile";
import { connect } from "react-redux";
import { changeCourse } from "../../redux/current-course/actionCreators";
import selectors from "../../redux/selectors";

/**
 * @jaidharosenblatt Render a navbar in a header. Stores current page in a state
 */
const NavBar = (props) => {
  const menuItems = MenuItems(props.courses);

  function setPath() {
    const courseID = window.location.pathname.substr(1);

    if (props.currentCourse !== courseID) {
      updateCourse(courseID);
    }
  }

  function updateCourse(courseID) {
    props.changeCourse(courseID);
  }

  //Detect any update in case user hits back
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setPath();
    }
  });

  //Detect component did mount
  useEffect(() => {
    setPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.signedIn) {
    return (
      <Row align="middle" className="navbar-wrapper">
        <Col span={24}>
          <div className="mobile-navbar">
            <Mobile
              handleSelect={updateCourse}
              selected={props.currentCourse}
              menuItems={menuItems}
            />
          </div>
          <div className="desktop-navbar">
            {/* Fixing navbar overflow for too many courses */}
            {props.courses.length > 4 ? (
              <Mobile
                handleSelect={updateCourse}
                selected={props.currentCourse}
                menuItems={menuItems}
              />
            ) : (
              <SignedIn
                handleSelect={updateCourse}
                selected={props.currentCourse}
                menuItems={menuItems}
              />
            )}
          </div>
        </Col>
      </Row>
    );
  } else {
    return (
      <Row align="middle" className="navbar-wrapper">
        <Col span={24} className="signedout-navbar">
          <SignedOut />
        </Col>
      </Row>
    );
  }
};

function mapStateToProps(state, prevProps) {
  return { ...prevProps, currentCourse: selectors.getCourseID(state) };
}
export default connect(mapStateToProps, { changeCourse })(NavBar);

import React, { useEffect, useState, useRef } from "react";
import "./NavBar.css";
import { Row, Col } from "antd";
import MenuItems from "./MenuItems";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import Mobile from "./Mobile";
import { connect } from "react-redux";
import { setCurrentCourse } from "../../redux/current-course/actionCreators";

/**
 * @jaidharosenblatt Render a navbar in a header. Stores current page in a state
 */
const NavBar = (props) => {
  const menuItems = MenuItems(props.courses);
  console.log(props);

  function setPath() {
    const courseID = window.location.pathname.substr(1);
    props.setCurrentCourse(courseID);
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
  }, []);

  if (props.signedIn) {
    return (
      <Row align="middle" className="navbar-wrapper">
        <Col span={24}>
          <div className="mobile-navbar">
            <Mobile
              handleSelect={props.setCurrentCourse}
              selected={props.currentCourse}
              menuItems={menuItems}
            />
          </div>
          <div className="desktop-navbar">
            {/* Fixing navbar overflow for too many courses */}
            {props.courses.length > 4 ? (
              <Mobile
                handleSelect={props.setCurrentCourse}
                selected={props.currentCourse}
                menuItems={menuItems}
              />
            ) : (
              <SignedIn
                handleSelect={props.setCurrentCourse}
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
  return { ...prevProps, currentCourse: state.currentCourse };
}
export default connect(mapStateToProps, { setCurrentCourse })(NavBar);

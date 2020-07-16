import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import { Row, Col, Button } from "antd";
import { Logo } from "../../static/Images";
import { Link } from "react-router-dom";
import "./addcourse.css";


/**
 * @MatthewSclar
 * This is the final stage for the create course workflow for instructors
 *
 */

const Confirmation = () => {
  const [confirmed, setConfirmed] = useState(false);

const onClick = ()=>{
  setConfirmed(true);
}
  return (<>
    {confirmed ? (
      <Redirect to="/admin/course" />
    ):(<Row className="AddCourse">
          <Col xs={0} md={10}>
            <div className="ImageCard" />
          </Col>
          <Col xs={24} md={14}>
            <div className="FormWrapper">
              <div className="AddCourseForm" style={{width:"50%"}}>
                <Col align="center" span={24}>
                  <Link to="/">
                    <img className="WotoLogo" src={Logo} alt="Woto Logo" />
                  </Link>
                    <h2 style={{paddingBottom:"10px",paddingTop:"10px"}}> Your course has been created! </h2>
                      <Button block type="primary" onClick={onClick} >
                        Let's Get Started!
                      </Button>
                </Col>
              </div>
            </div>
          </Col>
        </Row>)}
  </>);
};

export default Confirmation;
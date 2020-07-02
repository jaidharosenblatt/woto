import React from "react";
import { Col, Button } from "antd";
import { Link } from "react-router-dom";
import { FourZeroFourImage } from "../../static/Images";
import "./errors.css";
const PageNotFound = () => {
  console.log("page not found");

  return (
    <Col span={24} align="center">
      <div>
        <img className="hero-image" alt="404" src={FourZeroFourImage} />
        <h1 className="page-not-found-container">Page not found</h1>
        <Link to="/">
          <Button size="large" type="primary">
            Take me back home
          </Button>
        </Link>
      </div>
    </Col>
  );
};

export default PageNotFound;

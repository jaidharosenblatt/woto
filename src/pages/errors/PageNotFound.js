import React from "react";
import { Col, Button } from "antd";
import { Link } from "react-router-dom";
import "./errors.css";
import { PageNotFoundImage } from "../../static/LoadedImages";

const PageNotFound = () => {
  return (
    <Col span={24} align="center">
      <div>
        <PageNotFoundImage className="hero-image" />
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

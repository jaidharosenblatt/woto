import { Row, Col } from "antd";
import React from "react";

/**
 * Render a Row with a title and body
 * @param {Boolean} right whether image has image on right
 * @param {JSX} image
 * @param {String} title for h2
 * @param {String} body for p
 */
const ImageTitle = (props) => {
  if (props.right) {
    return (
      <Row align="middle" gutter={[24, 24]}>
        <Col xs={24} md={0} align="center">
          {props.image}
        </Col>
        <Col xs={24} md={13}>
          <h2>{props.title}</h2>
          <p>{props.body}</p>
        </Col>
        <Col xs={0} md={11} align="center">
          {props.image}
        </Col>
      </Row>
    );
  }

  return (
    <Row align="middle" gutter={[24, 24]}>
      <Col xs={24} md={11} align="center">
        {props.image}
      </Col>
      <Col xs={24} md={13}>
        <h2>{props.title}</h2>
        <p>{props.body}</p>
      </Col>
    </Row>
  );
};

export default ImageTitle;

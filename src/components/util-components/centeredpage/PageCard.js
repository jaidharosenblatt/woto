import React from "react";
import { Space, Card } from "antd";
import "./centered.css";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";

/**
 * Render a card centered on page
 * @param {Arrar} children items to render in card
 * @param {Boolean} navbar whether or not to consider navbar when calc height
 */
const PageCard = (props) => {
  const marginLeft = props.isAuthenticated ? "-220px" : "0px";
  return (
    <div
      className="page-card"
      style={
        props.navbar
          ? { height: "calc(100vh - 92px)" }
          : { height: "100vh", marginLeft }
      }
    >
      <Space size={0} align="center">
        <Card>{props.children}</Card>
      </Space>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: selectors.getAuthenticationStatus(state),
  };
};

export default connect(mapStateToProps)(PageCard);

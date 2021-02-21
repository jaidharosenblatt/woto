import React from "react";
import { Space, Row, Avatar } from "antd";

import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import { DefaultProfile } from "../../../static/Images";
const COLORS = ["#40A9FF", "#FFB864", "#9254DE", "#FF4D50"];

/**
 * @param {Function} markAway
 * @param {Boolean} isOwner
 * @param {Integer} selectedIndex
 * @param {Function} setSelectedIndex
 * @param {Array} participants
 * @param {Object} user
 * @param {String} userID
 */
const Avatars = (props) => {
  return (
    <Row className="avatars">
      {props.participants?.map((user, i) => {
        return (
          <Space key={i} align="center" direction="vertical">
            <div
              className="avatar-wrapper"
              style={{
                border: `1px solid ${COLORS[i % COLORS.length]}`,
              }}
            >
              <Avatar
                onClick={() => props.setSelectedIndex(i)}
                style={
                  props.selectedIndex === i ? {} : { filter: "grayscale(100%)" }
                }
                src={user?.avatar || DefaultProfile}
              />
            </div>
            <h3>{user._id === props.userID ? "You" : user.name}</h3>
          </Space>
        );
      })}
    </Row>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    userID: selectors.getUserID(state),
    user: selectors.getUser(state),
  };
};

export default connect(mapStateToProps)(Avatars);

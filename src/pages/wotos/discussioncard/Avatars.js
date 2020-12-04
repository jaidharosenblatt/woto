import React from "react";
import { Space, Row, Avatar } from "antd";

import { DefaultProfile } from "../../../static/Images";
import MarkAwayBadge from "../../../components/buttons/MarkAwayBadge";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
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
  function getName(user, i) {
    if (user.name) {
      return user.name;
    }
    if (user.participant === props.userID) {
      return "You";
    } else {
      return `Student ${i + 1}`;
    }
  }

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
                src={DefaultProfile}
              />
            </div>
            <div style={{ display: "flex" }}>
              <h3>{getName(user, i)}</h3>
              {props.isOwner && user.participant !== props.user._id && (
                <MarkAwayBadge
                  markAway={() => props.markAway(user)}
                  name={props.getName(user, i)}
                />
              )}
            </div>
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

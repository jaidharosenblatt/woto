import React from "react";
import { Button, Input } from "antd";
import { UserOutlined, LikeOutlined, DislikeOutlined } from "@ant-design/icons";

class VirtualRoomModal extends React.Component {
  render() {
    return (
      <div className="main-div-acm">
        <div className="vm-div">
          <img src={this.props.modalIcon} alt="active" className="vid-icon" />
          <p className="virtual-room-text">Virtual Room</p>
        </div>

        <div className="vm-div">
          <Input
            className="course-input"
            placeholder="duke.zoom.us/1234567890"
          />
          <Button className="edit-vr-button" type="primary">
            Edit
          </Button>
        </div>

        <div className="align-div">
          <Button className="join-now-button" type="primary">
            Join Now
          </Button>
          <Button
            className="cancel-button-vr"
            type="primary"
            onClick={this.props.handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default VirtualRoomModal;

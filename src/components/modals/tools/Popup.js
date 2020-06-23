import React from "react";
import { Modal, Button } from "antd";
import "../modals.css";
/**
 * @ameer50 class for using modals
 * @param {props} element to make clickable
 * @param {props} modal component from "../modals"
 * @param {props} user

 */
class Popup extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const ModalContent = this.props.modal;
    return (
      <>
        <div className="element-wrapper" onClick={this.showModal}>
          {this.props.element}
        </div>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel} // allows you to click anywhere and remove modal
          centered={true}
          footer={null}
          closable={false}
          width="auto"
          height="auto"
        >
          <ModalContent
            handleCancel={this.handleCancel}
            user={this.props.user}
          />
        </Modal>
      </>
    );
  }
}

export default Popup;

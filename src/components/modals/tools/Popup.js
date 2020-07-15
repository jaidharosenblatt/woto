import React from "react";
import { Modal } from "antd";
import "../modals.css";
/**
 * @ameer50 @jaidharosenblatt class for using modals
 * Passes all props to modal provided
 * @param {props} element to make clickable
 * @param {props} modal component from "../modals"
 * @param {...props} all other props to pass to modal

 */
class Popup extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { modal, element, ...attributeProps } = this.props;
    const ModalContent = modal;
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
          <ModalContent {...attributeProps} hideModal={this.handleCancel} />
        </Modal>
      </>
    );
  }
}

export default Popup;

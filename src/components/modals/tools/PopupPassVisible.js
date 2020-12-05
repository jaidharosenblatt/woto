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
class PopupPassVisible extends React.Component {
  state = { visible: null };

  static getDerivedStateFromProps(props, state) {
    if (props.visibility !== state.visible) {
      return {
        visible: props.visibility,
      };
    }
    return null
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
/*
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
*/
  render() {
    const { visibility, modal, handleCancel, ...attributeProps } = this.props;
    const ModalContent = modal;
    return (
      <>
        <Modal
          visible={this.state.visible}
          onCancel={handleCancel} // allows you to click anywhere and remove modal
          centered={true}
          footer={null}
          closable={false}
          width="auto"
          height="auto"
        >
          <ModalContent {...attributeProps} hideModal={handleCancel} />
        </Modal>
      </>
    );
  }
}

export default PopupPassVisible;
